'use strict';

const {Model} = require(`sequelize`);


module.exports = (sequelize, DataTypes) => {
  class OfferType extends Model {
    static associate(models) {
      // define association here
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
