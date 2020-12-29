'use strict';

const path = require(`path`);
const {ExitCode} = require(`../../../constants`);
const {getRandomInt, arrayUtils, fileUtils, dateUtils} = require(`../../../utils`);
const {getLogger} = require(`../../lib/logger`);

const users = require(`../../../../mocks/users.json`);
const offerTypes = require(`../../../../mocks/offer-types.json`);

const {PROJECT_DIR} = require(`../../../../settings`);
const DATA_PATH = path.join(PROJECT_DIR, `data`);
const FILE_TITLES_PATH = path.join(DATA_PATH, `titles.txt`);
const FILE_SENTENCES_PATH = path.join(DATA_PATH, `sentences.txt`);
const FILE_NAME = path.join(PROJECT_DIR, `mocks`, `offers.json`);

const SumRestrict = {
  MIN: 500,
  MAX: 100000,
};

const OfferType = {
  OFFER: 1,
  SALE: offerTypes.length,
};

const UsersRestrict = {
  MIN: 1,
  MAX: users.length,
};

const DateRestrict = {
  MIN: 0,
  MAX: 3
};

const generateOffers = (count, options) => {
  const {title, sentences} = options;

  return Array(count).fill({}).map((_item, index) => ({
    id: index + 1,
    title: arrayUtils.getOneRandomElement(title),
    sentences: arrayUtils.getRandomElements(sentences).join(` `),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    createDate: dateUtils.getRandomDate(DateRestrict.MIN, DateRestrict.MAX),
    offerTypeId: getRandomInt(OfferType.OFFER, OfferType.SALE),
    userId: getRandomInt(UsersRestrict.MIN, UsersRestrict.MAX),
  }));
};


const generateOffersMock = (async () => {
  const logger = getLogger({name: `GENERATE-OFFERS`});
  try {
    logger.info(`Попытка создать файл заполнения базы данных предложений...`);
    const options = {
      title: await fileUtils.readTextFileToArray(FILE_TITLES_PATH),
      sentences: await fileUtils.readTextFileToArray(FILE_SENTENCES_PATH),
    };

    await fileUtils.writeFileJSON(FILE_NAME, generateOffers(45, options));
    logger.info(`Файл создан по адресу: ${FILE_NAME}`);
  } catch (error) {
    logger.error(`Произошла ошибка: ${error}`);
    process.exit(ExitCode.ERROR);
  }
})();

module.exports = {
  generateOffersMock,
};
