'use strict';
const fs = require(`fs`).promises;


const readFileToArray = async (filePath) => {
  const content = await fs.readFile(filePath, `utf-8`);
  return content.split(`\n`).filter((item) => item !== ``);
};

const writeFileJSON = async (fileName, content) => {
  await fs.writeFile(fileName, JSON.stringify(content, null, `\t`));
};


module.exports = {
  readFileToArray,
  writeFileJSON,
};
