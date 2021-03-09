'use strict';

const Alias = require(`../alias`);

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(`Comment`, {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: `comments`,
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Offer, {as: Alias.OFFERS, foreignKey: `offerId`});
    Comment.belongsTo(models.User, {as: Alias.USERS, foreignKey: `userId`});
  };

  return Comment;
};
