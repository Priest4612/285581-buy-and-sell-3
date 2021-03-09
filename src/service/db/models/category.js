'use strict';
const {Model} = require(`sequelize`);
const Alias = require(`../alias`);

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

    static associate(models) {
      // define association here
      // Category.hasMany(models.OfferToCategory, {as: Alias.OFFER_TO_CATEGORIES, foreignKey: `categoryId`});
      Category.belongsToMany(models.Offer, {through: models.OfferToCategory, as: Alias.OFFERS, foreignKey: `categoryId`});
      Category.hasMany(models.OfferToCategory, {as: Alias.OFFER_TO_CATEGORIES, foreignKey: `categoryId`});
    }
  }

  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: `Category`,
    tableName: `categories`,
    timestamps: false,
    paranoid: false,
  });
  return Category;
};
