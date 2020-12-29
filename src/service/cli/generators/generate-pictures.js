'use strict';

const path = require(`path`);
const {ExitCode} = require(`../../../constants`);
const {arrayUtils, fileUtils} = require(`../../../utils`);
const {getLogger} = require(`../../lib/logger`);
const offerCount = require(`../../../../mocks/offers.json`).length;

const {PROJECT_DIR} = require(`../../../../settings`);
const DATA_PATH = path.join(PROJECT_DIR, `data`);
const FILE_ITEM_IMG_PATH = path.join(DATA_PATH, `item-img.txt`);
const FILE_NAME = path.join(PROJECT_DIR, `mocks`, `pictures.json`);


const generatePictures = (count, pictures) => {
  return Array(count).fill({}).map((_item, index) => ({
    id: index + 1,
    picture: `/img/${arrayUtils.getOneRandomElement(pictures)}`,
    offerId: index + 1,
  }));
};

const generatePicturesMock = (async () => {
  const logger = getLogger({name: `GENERATE-PICTURES`});

  try {
    logger.info(`Попытка создать файл заполнения базы данных изображений...`);
    const pictures = await fileUtils.readTextFileToArray(FILE_ITEM_IMG_PATH);

    await fileUtils.writeFileJSON(FILE_NAME, generatePictures(offerCount, pictures));
    logger.info(`Файл создан по адресу: ${FILE_NAME}`);
  } catch (error) {
    logger.error(`Произошла ошибка: ${error}`);
    process.exit(ExitCode.ERROR);
  }
})();

module.exports = {
  generatePicturesMock,
};
