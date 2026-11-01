const fs = require('fs');
const path = require('path');
const xlsx = require(path.join(__dirname, '../frontend/node_modules/xlsx'));

const baseDir = path.join(__dirname, '../EXCEL FILES/extracted_menu1');
const excelPath = path.join(__dirname, '../EXCEL FILES/Menu_Dishes1.xlsx');

const workbook = xlsx.readFile(excelPath);

// 1. Map sheetName -> sheetIndex (1-based)
const sheetOrder = workbook.SheetNames;
console.log('Sheets:', sheetOrder);

// For each sheet, find drawing rel
// sheet1 -> sheet1.xml.rels -> drawingX.xml -> drawingX.xml.rels -> media/imageY.png
// and drawingX.xml gives from row -> rId

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

sheetOrder.forEach((sheetName, idx) => {
  const sheetNum = idx + 1;
  const sheetRelsPath = path.join(baseDir, `xl/worksheets/_rels/sheet${sheetNum}.xml.rels`);
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
          // Target="../media/image1.png"
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
      // Matches either oneCellAnchor or twoCellAnchor
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

  // Rows: row 0 is usually Title, row 1 is Headers [S.No, Image, Dish Name, Price]
  // row 2 is 0-indexed row 2, which corresponds to row 2 in xml!
  console.log(`\n=================== ${sheetName} ===================`);
  rows.forEach((row, rowIdx) => {
    if (rowIdx < 2) return; // skip title and header
    const sNo = row[0];
    const dishName = row[2];
    const price = row[3];
    const mediaImage = rowToMedia[rowIdx] || null;

    if (dishName) {
      const dishObj = {
        sheet: sheetName,
        rowIdx,
        sNo,
        dishName: String(dishName).trim(),
        price: Number(price) || 0,
        mediaImage
      };
      allDishes.push(dishObj);
      console.log(`[${sheetName}] S.No ${sNo} | "${dishObj.dishName}" | ₹${dishObj.price} | Image: ${mediaImage}`);
    }
  });
});

console.log(`\nTOTAL DISHES EXTRACTED: ${allDishes.length}`);
fs.writeFileSync(path.join(__dirname, '../EXCEL FILES/extracted_dishes1.json'), JSON.stringify(allDishes, null, 2));

