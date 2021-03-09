'use strict';
const {Model} = require(`sequelize`);

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
      // define association here
    }
  }

  Comment.init({
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: `Comment`,
    tableName: `comments`,
  });
  return Comment;
};
