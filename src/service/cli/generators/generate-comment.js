'use strict';

const path = require(`path`);
const {ExitCode} = require(`../../../constants`);
const {getRandomInt, arrayUtils, fileUtils, dateUtils} = require(`../../../utils`);
const {getLogger} = require(`../../lib/logger`);

const users = require(`../../../../mocks/users.json`);
const offers = require(`../../../../mocks/offers.json`);

const {PROJECT_DIR} = require(`../../../../settings`);
const DATA_PATH = path.join(PROJECT_DIR, `data`);
const FILE_COMMENTS_PATH = path.join(DATA_PATH, `comments.txt`);
const FILE_NAME = path.join(PROJECT_DIR, `mocks`, `comments.json`);

const UsersRestrict = {
  MIN: 1,
  MAX: users.length,
};

const CommentsReatrict = {
  MIN: 1,
  MAX: 4,
};

const DateRestrict = {
  MIN: 0,
  MAX: 3
};

const generateComments = (count, data) => {
  const comments = [];
  let currentId = 0;
  for (let i = 0; i < count; i++) {
    const countComments = getRandomInt(CommentsReatrict.MIN, CommentsReatrict.MAX);

    for (let j = 0; j < countComments; j++) {
      currentId = currentId + 1;
      const comment = {
        id: currentId,
        comment: arrayUtils.getOneRandomElement(data),
        createDate: dateUtils.getRandomDate(DateRestrict.MIN, DateRestrict.MAX),
        userId: getRandomInt(UsersRestrict.MIN, UsersRestrict.MAX),
        offerId: i + 1,
      };
      comments.push(comment);
    }
  }
  return comments;
};


const generateCommentsMock = (async () => {
  const logger = getLogger({name: `GENERATE-COMMENTS`});

  try {
    logger.info(`Попытка создать файл заполнения базы данных комментариями...`);
    const comments = await fileUtils.readTextFileToArray(FILE_COMMENTS_PATH);
    await fileUtils.writeFileJSON(FILE_NAME, generateComments(offers.length, comments));
    logger.info(`Файл создан по адресу: ${FILE_NAME}`);
  } catch (error) {
    logger.error(`Произошла ошибка: ${error}`);
    process.exit(ExitCode.ERROR);
  }
})();

module.exports = {
  generateCommentsMock,
};
