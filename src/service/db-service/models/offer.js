'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class Offer extends Model {}
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
    createDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    timestamps: false,
    paranoid: false
  });

  return Offer;
};
