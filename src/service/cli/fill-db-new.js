'use strict';

const faker = require(`faker`);
const {sequelize} = require(`../lib/sequelize`);
const {getLogger} = require(`../lib/logger`);
const {nanoid} = require(`nanoid`);
const defineModels = require(`../models`);
const Alias = require(`../models/alias`);

const {
  getRandomInt,
  arrayUtils: {
    getOneRandomElement,
    getRandomElements,
  },
  dateUtils: {
    getRandomDate,
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
    MONTH_INTERVAL,
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
  Array(MAX_USERS).fill({}).map((_item, index) => ({
    firstname: `${faker.name.findName()}`,
    lastname: `${faker.name.lastName()}`,
    birthDate: getOneRandomElement(birthDate),
    email: `${faker.internet.email()}`,
    password: nanoid(getRandomInt(5, 10)),
    avatar: `/img/avatar${(index + 1).toString().padStart(2, 0)}.jpg`
  }));

const generateOffers = (count, title, sentences, comments, types, categories, users) =>
  Array(count).fill({}).map(() => ({
    title: getOneRandomElement(title),
    sentences: getRandomElements(sentences).join(` `),
    sum: getRandomInt(MIN_SUM, MAX_SUM),
    createDate: getRandomDate(0, MONTH_INTERVAL),
    offerTypeId: getOneRandomElement(types).id,
    userId: getOneRandomElement(users).id,
    [Alias.PICTURES]: ({path: `/img/item${(getRandomInt(0, MAX_PICTURES)).toString().padStart(2, 0)}.jpg`}),
    [Alias.comments]: Array(getRandomInt(0, MAX_COMMENTS))
      .fill({})
      .map(() => ({
        text: getRandomElements(comments).join(` `),
        userId: getOneRandomElement(users).id,
      })),
    categories: getRandomElements(categories).map((category) => category.id),
  }));


module.exports = {
  name: `--filldb`,

  async run(args) {
    const logger = getLogger({name: `FILL-DB`});

    try {
      const {Category, Offer, OfferType, User} = defineModels(sequelize);
      await sequelize.sync({force: true});

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
        OfferType.bulkCreate(generateOfferTypes(offerTypesContent)),
        Category.bulkCreate(generateCategories(categoriesContent)),
        User.bulkCreate(generateUsers(birthDateContent))
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

      await Promise.all(
          generatedOffers
            .map(async (offer) => {
              const createdOffer = await Offer.create(offer, {include: [Alias.PICTURES, Alias.COMMENTS]});
              await createdOffer.addCategories(offer.categories);
            })
      );
      logger.info(`База данныз заполнена данными`);
    } catch (err) {
      logger.error(err);
      process.exit(ExitCode.ERROR);
    }
  }
};
