'use strict';

const {Model} = require(`sequelize`);
const Alias = require(`../alias`);

module.exports = (sequelize, DataTypes) => {
  class OfferType extends Model {
    static associate(models) {
      OfferType.hasMany(models.Offer, {as: Alias.OFFERS, foreignKey: `offerTypeId`});
    }
  }

  OfferType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: `OfferType`,
    tableName: `offerTypes`,
    timestamps: false,
    paranoid: false,
  });
  return OfferType;
};
