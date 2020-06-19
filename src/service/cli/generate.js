'use strict';
const chalk = require(`chalk`);
const path = require(`path`);

const {getRandomInt, arrayUtils, fileUtils} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);
const {PROJECT_DIR} = require(`../../../settings`);


const offerRestrict = {
  DEFAULT_COUNT: 1,
  MAX_COUNT: 1000,
};

const ROOT_PATH = PROJECT_DIR;
const FILE_NAME = path.join(ROOT_PATH, `mock.json`);

const DATE_PATH = path.join(ROOT_PATH, `date`);
const FILE_TITLES_PATH = path.join(DATE_PATH, `titles.txt`);
const FILE_SENTENCES_PATH = path.join(DATE_PATH, `sentences.txt`);
const FILE_CATEGORIES_PATH = path.join(DATE_PATH, `categories.txt`);

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};


const getPictureFileName = (number) => number > 10 ? `item${number}.jpg` : `item0${number}.jpg`;

const readContent = async (filePath) => {
  try {
    return await fileUtils.readFileToArray(filePath);
  } catch (err) {
    console.error(chalk.red(err));
    return process.exit(ExitCode.ERROR);
  }
};

const saveMock = async (fileName, content) => {
  try {
    await fileUtils.writeFileJSON(fileName, content);
    console.log(chalk.green(`Operation success. File created.`));
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(ExitCode.ERROR);
  }
};

const generateOffers = (count, title, sentences, categories) => {
  return Array(count).fill({}).map(() => ({
    type: Object.keys(OfferType)[getRandomInt(0, Object.keys(OfferType).length - 1)],
    title: arrayUtils.getOneRandomElement(title),
    description: arrayUtils.getRandomElements(sentences).join(` `),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    category: arrayUtils.getRandomElements(categories),
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || offerRestrict.DEFAULT_COUNT;

    const title = await readContent(FILE_TITLES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    if (countOffer <= offerRestrict.MAX_COUNT) {
      await saveMock(FILE_NAME, generateOffers(countOffer, title, sentences, categories));
    } else {
      console.error(chalk.red(`Не больше ${offerRestrict.MAX_COUNT} объявлений.`));
      process.exit(ExitCode.ERROR);
    }
  }
};
