const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');


const sofficePath = '"C:/Program Files/LibreOffice/program/soffice.exe"';


const inputFile = '"C:/Users/prathviraj.holla/Desktop/Dev-36803.docx"';
                                                         

const outputDir = path.resolve('./output');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}


const command = `${sofficePath} --headless --convert-to html --outdir "${outputDir}" ${inputFile}`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error('Error during conversion:', err);
    console.error(stderr);
  } else {
    console.log('Successfully converted to HTML.');
    console.log(stdout);
  }
});
