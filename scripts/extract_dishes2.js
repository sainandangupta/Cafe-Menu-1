const fs = require('fs');
const path = require('path');
const xlsx = require(path.join(__dirname, '../frontend/node_modules/xlsx'));

const baseDir = path.join(__dirname, '../EXCEL FILES/extracted_menu2');
const excelPath = path.join(__dirname, '../EXCEL FILES/Menu_dishes2.xlsx');

const workbook = xlsx.readFile(excelPath);
console.log('Sheets in Menu_dishes2.xlsx:', workbook.SheetNames);

function parseXmlAttrs(tagStr) {
  const attrs = {};
  const regex = /(\w+[:\w]*)="([^"]*)"/g;
  let match;
  while ((match = regex.exec(tagStr)) !== null) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

const allDishes = [];

// Read xl/workbook.xml and xl/_rels/workbook.xml.rels to get exact sheet to sheet file mapping
const wbXmlPath = path.join(baseDir, 'xl/workbook.xml');
const wbRelsPath = path.join(baseDir, 'xl/_rels/workbook.xml.rels');

const wbXml = fs.readFileSync(wbXmlPath, 'utf8');
const wbRelsXml = fs.readFileSync(wbRelsPath, 'utf8');

const rIdToTarget = {};
for (const m of wbRelsXml.matchAll(/<Relationship\s+([^>]+)\/>/g)) {
  const attrs = parseXmlAttrs(m[1]);
  rIdToTarget[attrs.Id] = attrs.Target; // e.g. worksheets/sheet1.xml
}

const sheetNameToTarget = {};
for (const m of wbXml.matchAll(/<sheet\s+([^>]+)\/>/g)) {
  const attrs = parseXmlAttrs(m[1]);
  // attrs.name, attrs['r:id']
  const rId = attrs['r:id'];
  if (rId && rIdToTarget[rId]) {
    sheetNameToTarget[attrs.name] = rIdToTarget[rId];
  }
}

console.log('Sheet target mapping:', sheetNameToTarget);

workbook.SheetNames.forEach((sheetName) => {
  const sheetTarget = sheetNameToTarget[sheetName] || `worksheets/sheet${idx + 1}.xml`;
  const sheetFileName = path.basename(sheetTarget); // e.g. sheet1.xml
  const sheetRelsPath = path.join(baseDir, `xl/worksheets/_rels/${sheetFileName}.rels`);
  let drawingFile = null;

  if (fs.existsSync(sheetRelsPath)) {
    const relsContent = fs.readFileSync(sheetRelsPath, 'utf8');
    const drawingMatch = relsContent.match(/Target="\.\.\/drawings\/(drawing\d+\.xml)"/);
    if (drawingMatch) {
      drawingFile = drawingMatch[1];
    }
  }

  // Parse drawing rels to map rId -> image file
  const rIdToMedia = {};
  if (drawingFile) {
    const drawingRelsPath = path.join(baseDir, `xl/drawings/_rels/${drawingFile}.rels`);
    if (fs.existsSync(drawingRelsPath)) {
      const dRelsContent = fs.readFileSync(drawingRelsPath, 'utf8');
      const relMatches = dRelsContent.matchAll(/<Relationship\s+([^>]+)\/>/g);
      for (const m of relMatches) {
        const attrs = parseXmlAttrs(m[1]);
        if (attrs.Id && attrs.Target) {
          rIdToMedia[attrs.Id] = path.basename(attrs.Target);
        }
      }
    }
  }

  // Parse drawing xml to map row (0-based) -> rId
  const rowToMedia = {};
  if (drawingFile) {
    const drawingPath = path.join(baseDir, `xl/drawings/${drawingFile}`);
    if (fs.existsSync(drawingPath)) {
      const dContent = fs.readFileSync(drawingPath, 'utf8');
      const anchorMatches = dContent.matchAll(/<xdr:(?:oneCellAnchor|twoCellAnchor)>([\s\S]*?)<\/xdr:(?:oneCellAnchor|twoCellAnchor)>/g);
      for (const m of anchorMatches) {
        const block = m[1];
        const rowMatch = block.match(/<xdr:row>(\d+)<\/xdr:row>/);
        const blipMatch = block.match(/r:embed="([^"]+)"/);
        if (rowMatch && blipMatch) {
          const rowIdx = parseInt(rowMatch[1], 10);
          const rId = blipMatch[1];
          if (rIdToMedia[rId]) {
            rowToMedia[rowIdx] = rIdToMedia[rId];
          }
        }
      }
    }
  }

  // Read rows from sheet
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  console.log(`\n=================== ${sheetName} (drawing: ${drawingFile}) ===================`);
  console.log('Sample rows:');
  console.log(rows.slice(0, 4));

  // Find header row index
  let headerRowIdx = -1;
  for (let i = 0; i < Math.min(rows.length, 5); i++) {
    const r = rows[i] || [];
    if (r.some(cell => typeof cell === 'string' && (cell.toLowerCase().includes('dish') || cell.toLowerCase().includes('name') || cell.toLowerCase().includes('item') || cell.toLowerCase().includes('price')))) {
      headerRowIdx = i;
      break;
    }
  }

  console.log(`Header row index: ${headerRowIdx}`);
  const headers = headerRowIdx >= 0 ? rows[headerRowIdx] : [];
  console.log('Headers:', headers);

  let dishCol = -1;
  let priceCol = -1;
  let sNoCol = -1;

  headers.forEach((h, cIdx) => {
    if (!h) return;
    const str = String(h).toLowerCase();
    if (str.includes('dish') || str.includes('item') || str.includes('name')) dishCol = cIdx;
    if (str.includes('price')) priceCol = cIdx;
    if (str.includes('s.no') || str.includes('sr') || str.includes('sn')) sNoCol = cIdx;
  });

  if (dishCol === -1) dishCol = 2;
  if (priceCol === -1) priceCol = 3;
  if (sNoCol === -1) sNoCol = 0;

  console.log(`Detected columns -> S.No: ${sNoCol}, Dish: ${dishCol}, Price: ${priceCol}`);

  const startRow = headerRowIdx >= 0 ? headerRowIdx + 1 : 2;

  for (let rIdx = startRow; rIdx < rows.length; rIdx++) {
    const row = rows[rIdx];
    if (!row || row.length === 0) continue;
    const dishName = row[dishCol];
    const price = row[priceCol];
    const sNo = row[sNoCol];
    const mediaImage = rowToMedia[rIdx] || null;

    if (dishName && String(dishName).trim()) {
      const dishObj = {
        sheet: sheetName,
        rowIdx: rIdx,
        sNo,
        dishName: String(dishName).trim(),
        price: Number(price) || 0,
        mediaImage
      };
      allDishes.push(dishObj);
      console.log(`[${sheetName}] Row ${rIdx} | "${dishObj.dishName}" | ₹${dishObj.price} | Image: ${mediaImage}`);
    }
  }
});

console.log(`\nTOTAL DISHES EXTRACTED FROM FILE 2: ${allDishes.length}`);
fs.writeFileSync(path.join(__dirname, '../EXCEL FILES/extracted_dishes2.json'), JSON.stringify(allDishes, null, 2));

