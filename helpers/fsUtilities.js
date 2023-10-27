const fs = require('fs');
const util = require('util');

// promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);



const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

  

  const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };
  
  
  const readAndRemove = (idToRemove, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        const newData = parsedData.filter(obj => obj.id !== idToRemove);
        writeToFile(file, newData);
      }
    });
  };
  
  
    


module.exports = { readFromFile, writeToFile, readAndAppend, readAndRemove };
