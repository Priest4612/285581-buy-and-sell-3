'use strict';

const {Model, DataTypes} = require(`sequelize`);

class OfferType extends Model {

}

const define = (sequelize) => OfferType.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: `OfferType`,
  tableName: `offerTypes`,
  timestamps: false,
  paranoid: false,
});


module.exports = define;
