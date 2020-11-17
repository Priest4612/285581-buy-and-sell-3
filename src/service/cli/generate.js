'use strict';

const chalk = require(`chalk`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `GENERATE`});

const {getRandomInt, arrayUtils, fileUtils} = require(`../../utils`);
const {ExitCode, MAX_ID_LENGTH} = require(`../../constants`);
const {PROJECT_DIR} = require(`../../../settings`);

const ROOT_PATH = PROJECT_DIR;
const FILE_NAME = path.join(ROOT_PATH, `mock.json`);

const DATA_PATH = path.join(ROOT_PATH, `data`);
const FILE_TITLES_PATH = path.join(DATA_PATH, `titles.txt`);
const FILE_SENTENCES_PATH = path.join(DATA_PATH, `sentences.txt`);
const FILE_CATEGORIES_PATH = path.join(DATA_PATH, `categories.txt`);
const FILE_COMMENTS_PATH = path.join(DATA_PATH, `comments.txt`);


const OfferRestrict = {
  DEFAULT_COUNT: 1,
  MAX_COUNT: 1000,
};

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

const CommentsReatrict = {
  MIN: 1,
  MAX: 4,
};

const getPictureFileName = (number) => number > 10 ? `item${number}.jpg` : `item0${number}.jpg`;

const generateComments = (count, comments) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: arrayUtils.getOneRandomElement(comments),
  }));
};

const generateOffers = (count, options) => {
  const {title, sentences, categories, comments} = options;

  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    type: Object.keys(OfferType)[getRandomInt(0, Object.keys(OfferType).length - 1)],
    title: arrayUtils.getOneRandomElement(title),
    description: arrayUtils.getRandomElements(sentences).join(` `),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    category: arrayUtils.getRandomElements(categories),
    comments: generateComments(getRandomInt(CommentsReatrict.MIN, CommentsReatrict.MAX), comments),
  }));
};


module.exports = {
  name: `--generate`,
  async run(args) {
    try {
      const [count] = args;
      const countOffer = Number.parseInt(count, 10) || OfferRestrict.DEFAULT_COUNT;

      const options = {
        title: await fileUtils.readTextFileToArray(FILE_TITLES_PATH),
        sentences: await fileUtils.readTextFileToArray(FILE_SENTENCES_PATH),
        categories: await fileUtils.readTextFileToArray(FILE_CATEGORIES_PATH),
        comments: await fileUtils.readTextFileToArray(FILE_COMMENTS_PATH),
      };


      if (countOffer > OfferRestrict.MAX_COUNT) {
        logger.error(`Не больше ${OfferRestrict.MAX_COUNT} объявлений.`);
        process.exit(ExitCode.ERROR);
      }

      await fileUtils.writeFileJSON(FILE_NAME, generateOffers(countOffer, options));
      logger.info(`Operation success. File created.`);
    } catch (err) {
      logger.error(err);
      process.exit(ExitCode.ERROR);
    }
  }
};
