'use strict';

const {Model, DataTypes} = require(`sequelize`);


class Comment extends Model {

}

const define = (sequelize) => Comment.init({
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: `Comment`,
  tableName: `comments`,
});


module.exports = define;
