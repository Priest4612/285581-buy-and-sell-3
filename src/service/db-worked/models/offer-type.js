'use strict';

const Alias = require(`../alias`);

module.exports = (sequelize, DataTypes) => {
  const OfferType = sequelize.define(`OfferType`, {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    tableName: `offerTypes`,
    timestamps: false,
    paranoid: false,
  });

  OfferType.associate = (models) => {
    OfferType.hasMany(models.Offer, {as: Alias.OFFERS, foreignKey: `offerTypeId`});
  };

  return OfferType;
};
