'use strict';

const path = require(`path`);
const {ExitCode} = require(`../../../constants`);
const {fileUtils} = require(`../../../utils`);
const {getLogger} = require(`../../lib/logger`);

const {PROJECT_DIR} = require(`../../../../settings`);
const DATA_PATH = path.join(PROJECT_DIR, `data`);
const FILE_CATEGORIES_PATH = path.join(DATA_PATH, `categories.txt`);
const FILE_CATEGORIES_IMG_PATH = path.join(DATA_PATH, `cat-img.txt`);
const FILE_NAME = path.join(PROJECT_DIR, `mocks`, `categories.json`);


const generateCategories = (count, categoties, pictures) => {
  return Array(count).fill({}).map((_item, index) => ({
    id: index + 1,
    category: categoties[index],
    picture: `/img/${pictures[index]}`
  }));
};


const generateCategoriesMock = (async () => {
  const logger = getLogger({name: `GENERATE-CATEGORIES`});
  try {
    logger.info(`Пытаемся создать файл начального заполнения базы данных для категорий...`);
    const categories = await fileUtils.readTextFileToArray(FILE_CATEGORIES_PATH);
    const pictures = await fileUtils.readTextFileToArray(FILE_CATEGORIES_IMG_PATH);
    await fileUtils.writeFileJSON(FILE_NAME, generateCategories(categories.length, categories, pictures));
    logger.info(`Файл создан по адресу: ${FILE_NAME}`);
  } catch (error) {
    logger.error(`Произошла ошибка: ${error}`);
    process.exit(ExitCode.ERROR);
  }
})();


module.exports = {
  generateCategoriesMock,
};
