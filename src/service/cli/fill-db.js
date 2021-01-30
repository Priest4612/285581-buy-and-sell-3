'use strict';

const faker = require(`faker`);
const {getLogger} = require(`../lib/logger`);
const {nanoid} = require(`nanoid`);
const initDB = require(`../lib/init-db`);
const {sequelize} = require(`../lib/sequelize`);

const {
  getRandomInt,
  arrayUtils: {
    getOneRandomElement,
    getRandomElements,
  },
  fileUtils: {
    readTextFileToArray,
  },
} = require(`../../utils`);


const {
  ExitCode,
  GenerateFileRequirements: {
    DEFAULT_OFFERS_COUNT,
    MAX_OFFERS_COUNT,
    MAX_OFFERS_MESSAGE,
    MAX_COMMENTS,
    MAX_PICTURES,
    MAX_USERS,
    MIN_SUM,
    MAX_SUM,
  },
  DataFilePath,
} = require(`../../constants`);

const generateOfferTypes = (offerTypes) =>
  offerTypes.map((type) => ({name: type}));

const generateCategories = (categories) =>
  categories.map((category, index) => ({
    name: category,
    picture: `/img/cat${(index + 1).toString().padStart(2, 0)}.jpg`
  }));

const generateUsers = (birthDate) =>
  Array(MAX_USERS).fill({}).map((_item) => ({
    firstname: `${faker.name.findName()}`,
    lastname: `${faker.name.lastName()}`,
    birthDate: getOneRandomElement(birthDate),
    email: `${faker.internet.email()}`,
    password: nanoid(getRandomInt(5, 10)),
    avatar: `/img/avatar${(getRandomInt(1, 4)).toString().padStart(2, 0)}.jpg`
  }));

const generateOffers = (count, title, sentences, comments, types, categories, users) =>
  Array(count).fill({}).map(() => ({
    title: getOneRandomElement(title),
    sentences: getRandomElements(sentences).join(` `),
    sum: getRandomInt(MIN_SUM, MAX_SUM),
    offerTypeId: getRandomInt(1, types.length),
    userId: getRandomInt(1, users.length),
    pictures: ({path: `/img/item${(getRandomInt(1, MAX_PICTURES)).toString().padStart(2, 0)}.jpg`}),
    comments: Array(getRandomInt(1, MAX_COMMENTS))
      .fill({})
      .map(() => ({
        text: getRandomElements(comments).join(` `),
        userId: getRandomInt(1, users.length),
      })),
    categories: getRandomElements(categories).map((category) => category.name),
  }));


module.exports = {
  name: `--filldb`,

  async run(args) {
    const logger = getLogger({name: `FILL-DB`});

    try {
      const [count] = args;
      const countOffer = Number.parseInt(count, 10) || DEFAULT_OFFERS_COUNT;

      if (countOffer > MAX_OFFERS_COUNT) {
        logger.error(MAX_OFFERS_MESSAGE);
        process.exit(ExitCode.ERROR);
      }

      const [sentencesContent, categoriesContent, titlesContent, commentsContent, offerTypesContent, birthDateContent] = await Promise.all([
        readTextFileToArray(DataFilePath.SENTENCES),
        readTextFileToArray(DataFilePath.CATEGORIES),
        readTextFileToArray(DataFilePath.TITLES),
        readTextFileToArray(DataFilePath.COMMENTS),
        readTextFileToArray(DataFilePath.OFFER_TYPES),
        readTextFileToArray(DataFilePath.BIRTH_DATE)
      ]);

      const [offerTypes, categories, users] = await Promise.all([
        generateOfferTypes(offerTypesContent),
        generateCategories(categoriesContent),
        generateUsers(birthDateContent)
      ]);

      const generatedOffers = generateOffers(
          countOffer,
          titlesContent,
          sentencesContent,
          commentsContent,
          offerTypes,
          categories,
          users
      );

      await initDB(sequelize, {offerTypes, categories, users, offers: generatedOffers});

    } catch (err) {
      logger.error(err);
      process.exit(ExitCode.ERROR);
    }
  }
};
