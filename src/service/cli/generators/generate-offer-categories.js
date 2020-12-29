'use strict';

const path = require(`path`);
const {ExitCode} = require(`../../../constants`);
const {fileUtils} = require(`../../../utils`);
const {getLogger} = require(`../../lib/logger`);

const offers = require(`../../../../mocks/offers.json`).length;
const categories = require(`../../../../mocks/categories.json`).length;

const {PROJECT_DIR} = require(`../../../../settings`);
const FILE_NAME = path.join(PROJECT_DIR, `mocks`, `offer-categories.json`);

const generateOfferToCategoties = () => {
  const offerToCategoties = [];

  for (let i = 0; i < offers; i++) {
    for (let j = 0; j < categories; j++) {
      const isWrite = Math.random() > 0.65;
      if (isWrite) {
        const recording = {
          offerId: i + 1,
          categoryId: j + 1,
        };
        offerToCategoties.push(recording);
      }
    }
  }

  return offerToCategoties;
};

const generateOfferToCategotiesMock = (async () => {
  const logger = getLogger({name: `GENERATE-OFFER-CATEGORIES`});
  try {
    logger.info(`Попытка создать файл заполнения базы данных категории предложения...`);
    await fileUtils.writeFileJSON(FILE_NAME, generateOfferToCategoties());
    logger.info(`Файл создан по адресу: ${FILE_NAME}`);
  } catch (error) {
    logger.error(`Произошла ошибка: ${error}`);
    process.exit(ExitCode.ERROR);
  }
})();

module.exports = {
  generateOfferToCategotiesMock,
};
