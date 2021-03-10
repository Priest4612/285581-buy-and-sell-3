'use strict';
const {Model} = require(`sequelize`);

module.exports = (sequelize, _DataTypes) => {

  class OfferToCategory extends Model {}

  OfferToCategory.init({}, {
    sequelize,
    modelName: `OfferToCategory`,
    tableName: `offerToCategories`,
    timestamps: false,
    paranoid: false,
  });
  return OfferToCategory;
};
