const fs = require('fs');
const util = require('util');

// promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// use fs writefile to write stringified content to the argument destination
const writeToFile = (destination, content) => {
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
};

// use fs readfile to retrieve the current file, append a new element, and write the new file
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
  

module.exports = { readFromFile, writeToFile, readAndAppend };
