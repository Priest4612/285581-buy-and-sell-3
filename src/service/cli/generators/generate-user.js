'use strict';

const path = require(`path`);
const {ExitCode} = require(`../../../constants`);
const {PROJECT_DIR} = require(`../../../../settings`);
const {getRandomInt, arrayUtils, fileUtils} = require(`../../../utils`);
const {getLogger} = require(`../../lib/logger`);


const DATA_PATH = path.join(PROJECT_DIR, `data`);
const FILE_FIRSTNAME_PATH = path.join(DATA_PATH, `firstname.txt`);
const FILE_LASTNAME_PATH = path.join(DATA_PATH, `lastname.txt`);
const FILE_BIRTHDATE_PATH = path.join(DATA_PATH, `birth-date.txt`);
const FILE_PASSWORD_PATH = path.join(DATA_PATH, `password.txt`);
const FILE_AVATAR_PATH = path.join(DATA_PATH, `avatar-img.txt`);
const FILE_NAME = path.join(PROJECT_DIR, `mocks`, `users.json`);


const UserRestrict = {
  MIN: 1,
  MAX: 5,
};

const generateUsers = (count, options) => {
  const {firstname, lastname, birthDate, password, avatar} = options;

  return Array(count).fill({}).map((_item, index) => ({
    id: index + 1,
    firstname: arrayUtils.getOneRandomElement(firstname),
    lastname: arrayUtils.getOneRandomElement(lastname),
    birthDate: arrayUtils.getOneRandomElement(birthDate),
    email: `email-${getRandomInt(1, password.length)}@not-email-test.test`,
    password: arrayUtils.getOneRandomElement(password),
    avatar: avatar[index],
  }));
};

const generateUsersMock = (async () => {
  const logger = getLogger({name: `GENERATE-USERS`});

  try {
    logger.info(`Попытка создать файл заполнения базы данных пользователей...`);
    const options = {
      firstname: await fileUtils.readTextFileToArray(FILE_FIRSTNAME_PATH),
      lastname: await fileUtils.readTextFileToArray(FILE_LASTNAME_PATH),
      birthDate: await fileUtils.readTextFileToArray(FILE_BIRTHDATE_PATH),
      password: await fileUtils.readTextFileToArray(FILE_PASSWORD_PATH),
      avatar: await fileUtils.readTextFileToArray(FILE_AVATAR_PATH),
    };

    await fileUtils.writeFileJSON(FILE_NAME, generateUsers(UserRestrict.MAX, options));
    logger.info(`Файл создан по адресу: ${FILE_NAME}`);
  } catch (error) {
    logger.error(`Произошла ошибка: ${error}`);
    process.exit(ExitCode.ERROR);
  }
})();

module.exports = {
  generateUsersMock,
};
