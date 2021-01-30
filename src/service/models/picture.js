'use strict';

const {Model, DataTypes} = require(`sequelize`);

class Picture extends Model {}

const define = (sequelize) => Picture.init({
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: `Picture`,
  tableName: `pictures`,
  timestamps: false,
  paranoid: false,
});


module.exports = define;
