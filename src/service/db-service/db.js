'use strict';

const {getLogger} = require(`../lib/logger`);
const {sequelize} = require(`../lib/sequelize`);


// Объявление моделей
const Comment = require(`./models/comment`)(sequelize);
const Offer = require(`./models/offer`)(sequelize);
const Category = require(`./models/category`)(sequelize);
const Picture = require(`./models/picture`)(sequelize);
const OfferType = require(`./models/offer-type`)(sequelize);
const User = require(`./models/user`)(sequelize);
const OfferToCategory = require(`./models/offer-to-category`)(sequelize);


// НАСТРОЙКА CВЯЗИ МЕЖДУ ТАБЛИЦАМИ
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

Offer.hasMany(Picture, {
  as: `pictures`,
  foreignKey: `offerId`,
});

Picture.belongsTo(Offer, {
  foreignKey: `offerId`,
  as: `offer`,
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
Offer.hasMany(OfferToCategory, {
  as: `offerToCategories`,
  foreignKey: `offerId`,
});

Category.hasMany(OfferToCategory, {
  as: `offerToCategories`,
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
    OfferType,
    User,
    Offer,
    Picture,
    OfferToCategory,
    Comment,
  },
  initDb,
  sequelize,
};
