'use strict';
const fs = require(`fs`).promises;


const readTextFileToArray = async (filePath) => {
  const content = await fs.readFile(filePath, `utf-8`);
  return content.split(`\n`).filter((item) => item !== ``);
};

const writeFileJSON = async (fileName, content) => {
  await fs.writeFile(fileName, JSON.stringify(content, null, `\t`));
};

const readJsonFileToArray = async (filePath) => {
  const content = await fs.readFile(filePath, `utf8`);
  return JSON.parse(content);
};


module.exports = {
  readTextFileToArray,
  readJsonFileToArray,
  writeFileJSON,
};
