'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class OfferTypes extends Model {}
  OfferTypes.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    timestamps: false,
    paranoid: false,
  });

  return OfferTypes;
};
