'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class Comment extends Model {}
  Comment.init({
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
    paranoid: false,
  });

  return Comment;
};
