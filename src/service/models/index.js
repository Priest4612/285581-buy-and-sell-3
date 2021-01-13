'use strict';

const Aliase = require(`./aliase`);
const defineCategory = require(`./category`);
const defineOfferType = require(`./offer-type`);
const defineComment = require(`./comment`);
const defineOffer = require(`./offer`);
const definePicture = require(`./picture`);
const defineUser = require(`./user`);
const defineOfferToCategory = require(`./offer-to-category`);

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
  OfferType.hasMany(Offer, {as: Aliase.OFFERS, foreignKey: `offerTypeId`});
  Offer.belongsTo(OfferType, {as: Aliase.OFFER_TYPES, foreignKey: `offerTypeId`});

  User.hasMany(Offer, {as: Aliase.OFFERS, foreignKey: `userId`});
  Offer.belongsTo(User, {as: Aliase.USERS, foreignKey: `userId`});

  Offer.hasMany(Picture, {as: Aliase.PICTURES, foreignKey: `offerId`});
  Picture.belongsTo(Offer, {as: Aliase.OFFERS, foreignKey: `offerId`});

  // ***********************************
  // Модель Comment
  // ***********************************
  User.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `userId`});
  Comment.belongsTo(User, {as: Aliase.USERS, foreignKey: `userId`});

  Offer.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `offerId`});
  Comment.belongsTo(Offer, {as: Aliase.OFFERS, foreignKey: `offerId`});


  // ***********************************
  // Модель offer_to_categories
  // ***********************************
  Offer.belongsToMany(Category, {through: OfferToCategory, as: Aliase.CATEGORIES});
  Category.belongsToMany(Offer, {through: OfferToCategory, as: Aliase.OFFERS});
  Category.hasMany(OfferToCategory, {as: Aliase.OfferToCategory});
};


module.exports = define;
