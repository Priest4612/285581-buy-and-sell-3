'use strict';

require(`dotenv`).config();
const Sequelize = require(`sequelize`);
const {getLogger} = require(`../lib/logger`);

// Подключение к базе данных
const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.USER_PASSWORD}`, {
  host: `${process.env.DB_HOST}`,
  dialect: `${process.env.DIALECT}`,
});

// Объявление моделей
const Category = require(`./models/category`)(sequelize);
const Comment = require(`./models/comment`)(sequelize);
const OfferType = require(`./models/offer-type`)(sequelize);
const Offer = require(`./models/offer`)(sequelize);
const Picture = require(`./models/picture`)(sequelize);
const User = require(`./models/user`)(sequelize);


// НАСТРОЙКА CВЯЗИ МЕЖДУ ТАБЛИЦАМИ

// ***********************************
// Модедь Picture
// ***********************************
User.hasMany(Picture, {
  as: `pictures`,
  foreignKey: `userId`,
});

Picture.belongsTo(User, {
  foreignKey: `userId`,
  as: `user`,
});


// ***********************************
// Модель Category
// ***********************************
Picture.hasMany(Category, {
  as: `categories`,
  foreignKey: `pictureId`,
});

Category.belongsTo(Picture, {
  foreignKey: `pictureId`,
  as: `picture`,
});


// ***********************************
// Модель Offer
// ***********************************
OfferType.hasMany(Offer, {
  as: `offers`,
  foreignKey: `offerTypeId`,
});

Offer.belongsTo(OfferType, {
  foreignKey: `offerTypeId`,
  as: `offerType`,
});

User.hasMany(Offer, {
  as: `offers`,
  foreignKey: `userId`,
});

Offer.belongsTo(User, {
  foreignKey: `userId`,
  as: `user`,
});

Picture.hasMany(Offer, {
  as: `offers`,
  foreignKey: `pictureId`,
});

Offer.belongsTo(Picture, {
  foreignKey: `pictureId`,
  as: `picture`,
});


// ***********************************
// Модель Comment
// ***********************************
User.hasMany(Comment, {
  as: `comments`,
  foreignKey: `userId`,
});

Comment.belongsTo(User, {
  foreignKey: `userId`,
  as: `user`,
});

Offer.hasMany(Comment, {
  as: `comments`,
  foreignKey: `offerId`,
});

Comment.belongsTo(Offer, {
  foreignKey: `offerId`,
  as: `offer`,
});


// ***********************************
// Модель offer_to_categories
// ***********************************
Offer.belongsToMany(Category, {
  through: `offer_categories`,
  as: `categories`,
  foreignKey: `offerId`,
  timestamps: false,
  paranoid: false,
});

Category.belongsToMany(Offer, {
  through: `offer_categories`,
  as: `offers`,
  foreignKey: `categoryId`,
});

// Синхронизация с базой данных
const initDb = async () => {
  const logger = getLogger({name: `DB-SYNC`});
  await sequelize.sync({force: true});
  logger.info(`Структура БД успешно создана.`);
};


module.exports = {
  db: {
    Category,
    Comment,
    OfferType,
    Offer,
    Picture,
    User,
  },
  initDb,
  sequelize,
};
