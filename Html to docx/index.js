const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');


const sofficePath = '"C:/Program Files/LibreOffice/program/soffice.exe"';
const inputFile = '"C:/Users/prathviraj.holla/Desktop/Executable _ OQD 4.html"';
const outputDir = path.resolve('./output');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}


const commandHtmlToDocx = `${sofficePath} --headless --convert-to docx:"MS Word 2007 XML" --outdir "${outputDir}" ${inputFile}`;

exec(commandHtmlToDocx, (err, stdout, stderr) => {
  if (err) {
    console.error('Error during HTML to DOCX conversion:', err);
    console.error(stderr);
    return;
  }

  console.log('Successfully converted HTML to DOCX.');
  console.log(stdout);
});
