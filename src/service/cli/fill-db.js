'use strict';

const path = require(`path`);
const {ExitCode} = require(`../../constants`);
const {sequelize} = require(`../lib/sequelize`);
const {getRandomInt, arrayUtils, fileUtils, dateUtils} = require(`../../utils`);
const {getLogger} = require(`../lib/logger`);
const {initDb, db} = require(`../db-service/db`);

const {PROJECT_DIR} = require(`../../../settings`);
const DATA_PATH = path.join(PROJECT_DIR, `data`);
const FILE_CATEGORIES_PATH = path.join(DATA_PATH, `categories.txt`);
const FILE_CATEGORIES_IMG_PATH = path.join(DATA_PATH, `cat-img.txt`);
const FILE_FIRSTNAME_PATH = path.join(DATA_PATH, `firstname.txt`);
const FILE_LASTNAME_PATH = path.join(DATA_PATH, `lastname.txt`);
const FILE_BIRTHDATE_PATH = path.join(DATA_PATH, `birth-date.txt`);
const FILE_PASSWORD_PATH = path.join(DATA_PATH, `password.txt`);
const FILE_AVATAR_PATH = path.join(DATA_PATH, `avatar-img.txt`);
const FILE_OFFER_TYPES_PATH = path.join(DATA_PATH, `offer-types.txt`);
const FILE_TITLES_PATH = path.join(DATA_PATH, `titles.txt`);
const FILE_SENTENCES_PATH = path.join(DATA_PATH, `sentences.txt`);
const FILE_ITEM_IMG_PATH = path.join(DATA_PATH, `item-img.txt`);
const FILE_COMMENTS_PATH = path.join(DATA_PATH, `comments.txt`);

const OfferRestrict = {
  DEFAULT_COUNT: 20,
  MAX_COUNT: 1000,
};

const generateCategories = (options) => {
  const {categories, pictures} = options;
  const count = categories.length;

  return Array(count).fill({}).map((_item, index) => ({
    id: index + 1,
    category: categories[index],
    picture: `/img/${pictures[index]}`
  }));
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


const generateOfferTypes = (count, offerTypes) => {
  return Array(count).fill({}).map((_item, index) => ({
    id: index + 1,
    type: offerTypes[index],
  }));
};


const generateOffers = (count, options) => {
  const {title, sentences, SumRestrict, DateRestrict, OfferType, UserRestrict} = options;

  return Array(count).fill({}).map((_item, index) => ({
    id: index + 1,
    title: arrayUtils.getOneRandomElement(title),
    sentences: arrayUtils.getRandomElements(sentences).join(` `),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    createDate: dateUtils.getRandomDate(DateRestrict.MIN, DateRestrict.MAX),
    offerTypeId: getRandomInt(OfferType.OFFER, OfferType.SALE),
    userId: getRandomInt(UserRestrict.MIN, UserRestrict.MAX),
  }));
};


const generatePictures = (count, pictures) => {
  return Array(count).fill({}).map((_item, index) => ({
    id: index + 1,
    picture: `/img/${arrayUtils.getOneRandomElement(pictures)}`,
    offerId: index + 1,
  }));
};

const generateOfferToCategories = (offers, categories) => {
  const offerToCategories = [];

  for (let i = 0; i < offers.length; i++) {
    for (let j = 0; j < categories.length; j++) {
      const isWrite = Math.random() > 0.65;
      if (isWrite) {
        const recording = {
          offerId: i + 1,
          categoryId: j + 1,
        };
        offerToCategories.push(recording);
      }
    }
  }

  return offerToCategories;
};


const generateComments = (count, options) => {
  const {data, CommentsReatrict, DateRestrict, UserRestrict} = options;
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
        userId: getRandomInt(UserRestrict.MIN, UserRestrict.MAX),
        offerId: i + 1,
      };
      comments.push(comment);
    }
  }
  return comments;
};


module.exports = {
  name: `--fill-db`,
  async run(args) {
    const logger = getLogger({name: `GENERATE`});

    try {
      const [count] = args;
      const countOffer = Number.parseInt(count, 10) || OfferRestrict.DEFAULT_COUNT;

      if (countOffer > OfferRestrict.MAX_COUNT) {
        logger.error(`Не больше ${OfferRestrict.MAX_COUNT} объявлений.`);
        process.exit(ExitCode.ERROR);
      }

      const categoryOptions = {
        categories: await fileUtils.readTextFileToArray(FILE_CATEGORIES_PATH),
        pictures: await fileUtils.readTextFileToArray(FILE_CATEGORIES_IMG_PATH),
      };
      const categories = generateCategories(categoryOptions);

      const UserRestrict = {
        MIN: 1,
        MAX: 5,
      };

      const userOptions = {
        firstname: await fileUtils.readTextFileToArray(FILE_FIRSTNAME_PATH),
        lastname: await fileUtils.readTextFileToArray(FILE_LASTNAME_PATH),
        birthDate: await fileUtils.readTextFileToArray(FILE_BIRTHDATE_PATH),
        password: await fileUtils.readTextFileToArray(FILE_PASSWORD_PATH),
        avatar: await fileUtils.readTextFileToArray(FILE_AVATAR_PATH),
      };
      const users = generateUsers(UserRestrict.MAX, userOptions);

      const offerTypesData = await fileUtils.readTextFileToArray(FILE_OFFER_TYPES_PATH);
      const offerTypes = generateOfferTypes(offerTypesData.length, offerTypesData);

      const SumRestrict = {
        MIN: 500,
        MAX: 100000,
      };

      const OfferType = {
        OFFER: 1,
        SALE: offerTypes.length,
      };

      const DateRestrict = {
        MIN: 0,
        MAX: 3
      };

      const offerOptions = {
        title: await fileUtils.readTextFileToArray(FILE_TITLES_PATH),
        sentences: await fileUtils.readTextFileToArray(FILE_SENTENCES_PATH),
        SumRestrict,
        DateRestrict,
        OfferType,
        UserRestrict
      };
      const offers = generateOffers(count, offerOptions);

      const picturesData = await fileUtils.readTextFileToArray(FILE_ITEM_IMG_PATH);
      const pictures = generatePictures(offers.length, picturesData);

      const offerToCategories = generateOfferToCategories(offers, categories);

      const CommentsReatrict = {
        MIN: 1,
        MAX: 4,
      };

      const commentOptions = {
        data: await fileUtils.readTextFileToArray(FILE_COMMENTS_PATH),
        CommentsReatrict,
        DateRestrict,
        UserRestrict
      };
      const comments = generateComments(offers.length, commentOptions);

      await initDb();
      logger.info(`Заполняем таблицы:`);
      logger.info(`Категории`);
      await db.Category.bulkCreate(categories);
      logger.info(`Успешно!`);
      logger.info(`Пользователи`);
      await db.User.bulkCreate(users);
      logger.info(`Успешно!`);
      logger.info(`Типы предложений`);
      await db.OfferType.bulkCreate(offerTypes);
      logger.info(`Успешно!`);
      logger.info(`Предложения`);
      await db.Offer.bulkCreate(offers);
      logger.info(`Успешно!`);
      logger.info(`Изображения`);
      await db.Picture.bulkCreate(pictures);
      logger.info(`Успешно!`);
      logger.info(`Связь между предложениями и категориями`);
      await db.OfferToCategory.bulkCreate(offerToCategories);
      logger.info(`Успешно!`);
      logger.info(`Комментарии`);
      await db.Comment.bulkCreate(comments);
      logger.info(`Успешно!`);
      await sequelize.close();
    } catch (err) {
      logger.error(err);
      process.exit(ExitCode.ERROR);
    }
  }
};
