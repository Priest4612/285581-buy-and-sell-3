'use strict';
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {ExitCode} = require(`../constants`);

const readFileToArray = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf-8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return process.exit(ExitCode.ERROR);
  }
};

const writeFileJSON = async (fileName, content) => {
  const date = JSON.stringify(content);
  try {
    await fs.writeFile(fileName, date);
    console.log(chalk.green(`Operation success. File created.`));
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(ExitCode.ERROR);
  }
};


module.exports = {
  readFileToArray,
  writeFileJSON,
};
