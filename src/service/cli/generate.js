'use strict';
const chalk = require(`chalk`);
const path = require(`path`);

const Utils = require(`../../utils`);
const {getRandomInt, shuffle, fileUtils} = Utils;
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

const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const generateOffers = (count, title, sentences, categories) => {
  return Array(count).fill({}).map(() => ({
    type: Object.keys(OfferType)[getRandomInt(0, Object.keys(OfferType).length - 1)],
    title: getRandomElement(title),
    description: shuffle(sentences).slice(1, 5).join(` `),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    category: [getRandomElement(categories)],
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || offerRestrict.DEFAULT_COUNT;

    const title = await fileUtils.readFileToArray(FILE_TITLES_PATH);
    const sentences = await fileUtils.readFileToArray(FILE_SENTENCES_PATH);
    const categories = await fileUtils.readFileToArray(FILE_CATEGORIES_PATH);

    if (countOffer <= offerRestrict.MAX_COUNT) {
      await fileUtils.writeFileJSON(FILE_NAME, generateOffers(countOffer, title, sentences, categories));
    } else {
      console.error(chalk.red(`Не больше ${offerRestrict.MAX_COUNT} объявлений.`));
      process.exit(ExitCode.ERROR);
    }
  }
};
