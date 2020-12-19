'use strict';

require(`dotenv`).config();
const Sequelize = require(`sequelize`);
const {getLogger} = require(`../lib/logger`);

const testConnect = async () => {
  const logger = getLogger({name: `DB-CONNECT`});
  const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.USER_PASSWORD}`, {
    host: `${process.env.DB_HOST}`,
    dialect: `${process.env.DIALECT}`,
  });

  try {
    logger.info(`Установка соединения с базой данных:`);
    await sequelize.authenticate();
    logger.info(`Успешно!`);
  } catch (err) {
    logger.error(`Ошибка: ${err}`);
    process.exit();
  }
};

module.exports = {
  testConnect,
};
