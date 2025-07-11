const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlFilePath = 'C:/Users/prathviraj.holla/Desktop/test html/Executable _ OQD 4.html';
const outputDir = path.resolve('./output_tables');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

function mergeRowCells(cells) {
 
  if (
    cells.length === 3 &&
    cells[1].trim() === ':' &&
    cells[0].length < 30 
  ) {
    const key = `${cells[0].trim()}${cells[1].trim()}`;
    const value = cells[2].trim();
    return { [key]: value };
  }

  
  const rowData = {};
  cells.forEach((text, i) => {
    const key = `Column${i + 1}`;
    rowData[key] = text.trim();
  });

  return rowData;
}

fs.readFile(htmlFilePath, 'utf-8', (err, html) => {
  if (err) {
    console.error('Error reading HTML file:', err);
    return;
  }

  const $ = cheerio.load(html);
  const tables = $('table');

  if (tables.length === 0) {
    console.log('No tables found in the HTML.');
    return;
  }

  const allTablesData = [];

  tables.each((index, table) => {
    const rows = [];

    $(table).find('tr').each((_, row) => {
      const cells = [];
      $(row).find('td, th').each((_, cell) => {
        const cleanText = $(cell).text().replace(/\s+/g, ' ').trim();
        cells.push(cleanText);
      });

      if (cells.length > 0) {
        const rowData = mergeRowCells(cells);
        rows.push(rowData);
      }
    });

    if (rows.length > 0) {
      allTablesData.push({
        tableNumber: index + 1,
        data: rows,
      });
    }
  });

  const outputPath = path.join(outputDir, 'all_tables.json');
  fs.writeFileSync(outputPath, JSON.stringify(allTablesData, null, 4));
  console.log(` Saved cleaned table data to ${outputPath}`);
});
