const path = require('path');
const xlsx = require(path.join(__dirname, '../frontend/node_modules/xlsx'));

const filePath = path.join(__dirname, '../EXCEL FILES/Menu_Dishes1.xlsx');
const workbook = xlsx.readFile(filePath);

console.log('Sheet Names:', workbook.SheetNames);

workbook.SheetNames.forEach(sheetName => {
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  console.log(`\n--- Sheet: ${sheetName} (Total rows: ${rows.length}) ---`);
  console.log('First 5 rows:');
  console.log(JSON.stringify(rows.slice(0, 8), null, 2));
});

