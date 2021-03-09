'use strict';
const {Model} = require(`sequelize`);
const Alias = require(`../alias`);

module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {

    static associate(models) {
      // define association here
      Offer.belongsTo(models.OfferType, {as: Alias.OFFER_TYPES, foreignKey: `offerTypeId`});
      Offer.belongsTo(models.User, {as: Alias.USERS, foreignKey: `userId`});
      Offer.hasMany(models.Picture, {as: Alias.PICTURES, foreignKey: `offerId`});
      Offer.hasMany(models.Comment, {as: Alias.COMMENTS, foreignKey: `offerId`});
      Offer.belongsToMany(models.Category, {through: models.OfferToCategory, as: Alias.CATEGORIES, foreignKey: `offerId`});
    }
  }

  Offer.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sentences: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sum: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: `Offer`,
    tableName: `offers`,
  });
  return Offer;
};
