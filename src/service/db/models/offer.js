'use strict';
const {Model} = require(`sequelize`);

module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {

    static associate(models) {
      // define association here
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
