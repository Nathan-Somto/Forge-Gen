const fs = require('fs');
const path = require('path');


function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file).replace(/\\/g, '/');
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath.replace(/../, '.'));
    }
  });

  return arrayOfFiles;
}

const filePath = process.argv[2];

const files = getAllFiles(filePath);
console.log(JSON.stringify(files, null, 2));

