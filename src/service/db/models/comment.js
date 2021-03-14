'use strict';
const {Model} = require(`sequelize`);
const Alias = require(`../alias`);

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
      Comment.belongsTo(models.Offer, {as: Alias.OFFERS, foreignKey: `offerId`});
      Comment.belongsTo(models.User, {as: Alias.USERS, foreignKey: `userId`});
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
