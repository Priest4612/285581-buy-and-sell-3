'use strict';

const {Model, DataTypes} = require(`sequelize`);

class Category extends Model {

}

const define = (sequelize) => Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: `Category`,
  tableName: `categories`,
});


module.exports = define;
