'use strict';

const {Model, DataTypes} = require(`sequelize`);

class Offer extends Model {

}

const define = (sequelize) => Offer.init({
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
  modelName: `Offer`,
  tableName: `offers`,
});


module.exports = define;
