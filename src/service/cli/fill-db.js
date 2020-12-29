'use strict';

const {ExitCode} = require(`../../constants`);
const {sequelize} = require(`../lib/sequelize`);
const {getLogger} = require(`../lib/logger`);
const {
  Comment,
  Offer,
  Category,
  Picture,
  OfferType,
  User,
  OfferToCategory
} = require(`../db-service/db`).db;

const categories = require(`../../../mocks/categories.json`);
const users = require(`../../../mocks/users.json`);
const offerTypes = require(`../../../mocks/offer-types.json`);
const offers = require(`../../../mocks/offers.json`);
const pictures = require(`../../../mocks/pictures.json`);
const offerToCategories = require(`../../../mocks/offer-categories.json`);
const comments = require(`../../../mocks/comments.json`);


module.exports = {
  name: `--fill-db`,
  async run() {
    const logger = getLogger({name: `GENERATE`});
    console.table(offerToCategories);
    try {
      logger.info(`Заполняем таблицы:`);
      logger.info(`Категории`);
      await Category.bulkCreate(categories);
      logger.info(`Успешно!`);
      logger.info(`Пользователи`);
      await User.bulkCreate(users);
      logger.info(`Успешно!`);
      logger.info(`Типы предложений`);
      await OfferType.bulkCreate(offerTypes);
      logger.info(`Успешно!`);
      logger.info(`Предложения`);
      await Offer.bulkCreate(offers);
      logger.info(`Успешно!`);
      logger.info(`Изображения`);
      await Picture.bulkCreate(pictures);
      logger.info(`Успешно!`);
      logger.info(`Связь между предложениями и категориями`);
      await OfferToCategory.bulkCreate(offerToCategories);
      logger.info(`Успешно!`);
      logger.info(`Комментарии`);
      await Comment.bulkCreate(comments);
      logger.info(`Успешно!`);
      await sequelize.close();
    } catch (err) {
      logger.error(err);
      process.exit(ExitCode.ERROR);
    }
  }
};
