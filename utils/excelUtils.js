const XLSX = require('xlsx');

function readProductNamesFromExcel(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, {header: 1});
    // Assuming product names are in the first column
    const productNames = data.map(row => row[0]).filter(name => name);
    return productNames;
}
module.exports = { readProductNamesFromExcel };
