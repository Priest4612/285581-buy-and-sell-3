'use strict';

const path = require(`path`);
const {ExitCode} = require(`../../../constants`);
const {fileUtils} = require(`../../../utils`);
const {getLogger} = require(`../../lib/logger`);

const {PROJECT_DIR} = require(`../../../../settings`);
const DATA_PATH = path.join(PROJECT_DIR, `data`);
const FILE_OFFER_TYPES_PATH = path.join(DATA_PATH, `offer-types.txt`);
const FILE_NAME = path.join(PROJECT_DIR, `mocks`, `offer-types.json`);

const generateOfferTypes = (count, offerTypes) => {
  return Array(count).fill({}).map((_item, index) => ({
    id: index + 1,
    type: offerTypes[index],
  }));
};

const generateOfferTypesMock = (async () => {
  const logger = getLogger({name: `GENERATE-OFFER-TYPES`});
  try {
    logger.info(`Пытаемся создать файл начального заполнения базы данных для типов предложения...`);
    const offerTypes = await fileUtils.readTextFileToArray(FILE_OFFER_TYPES_PATH);
    await fileUtils.writeFileJSON(FILE_NAME, generateOfferTypes(offerTypes.length, offerTypes));
    logger.info(`Файл создан по адресу: ${FILE_NAME}`);
  } catch (error) {
    logger.error(`Произошла ошибка: ${error}`);
    process.exit(ExitCode.ERROR);
  }
})();

module.exports = {
  generateOfferTypesMock,
};
