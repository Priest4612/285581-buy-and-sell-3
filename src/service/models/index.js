'use strict';

const Alias = require(`./alias`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineOffer = require(`./offer`);
const defineOfferToCategory = require(`./offer-to-category`);
const defineOfferType = require(`./offer-type`);
const definePicture = require(`./picture`);
const defineUser = require(`./user`);

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Offer = defineOffer(sequelize);
  const OfferToCategory = defineOfferToCategory(sequelize);
  const OfferType = defineOfferType(sequelize);
  const Picture = definePicture(sequelize);
  const User = defineUser(sequelize);

  // НАСТРОЙКА CВЯЗИ МЕЖДУ ТАБЛИЦАМИ
  // ***********************************
  // Модель Offer
  // ***********************************
  OfferType.hasMany(Offer, {as: Alias.OFFERS, foreignKey: `offerTypeId`});
  Offer.belongsTo(OfferType, {as: Alias.OFFER_TYPES, foreignKey: `offerTypeId`});

  User.hasMany(Offer, {as: Alias.OFFERS, foreignKey: `userId`});
  Offer.belongsTo(User, {as: Alias.USERS, foreignKey: `userId`});

  Offer.hasMany(Picture, {as: Alias.PICTURES, foreignKey: `offerId`});
  Picture.belongsTo(Offer, {as: Alias.OFFERS, foreignKey: `offerId`});

  // ***********************************
  // Модель Comment
  // ***********************************
  User.hasMany(Comment, {as: Alias.COMMENTS, foreignKey: `userId`});
  Comment.belongsTo(User, {as: Alias.USERS, foreignKey: `userId`});

  Offer.hasMany(Comment, {as: Alias.COMMENTS, foreignKey: `offerId`});
  Comment.belongsTo(Offer, {as: Alias.OFFERS, foreignKey: `offerId`});


  // ***********************************
  // Модель offer_to_categories
  // ***********************************
  Offer.belongsToMany(Category, {through: OfferToCategory, as: Alias.CATEGORIES});
  Category.belongsToMany(Offer, {through: OfferToCategory, as: Alias.OFFERS});
  Category.hasMany(OfferToCategory, {as: Alias.OFFER_TO_CATEGORIES});

  return {Comment, Category, Offer, OfferToCategory, OfferType, Picture, User};
};


module.exports = define;
