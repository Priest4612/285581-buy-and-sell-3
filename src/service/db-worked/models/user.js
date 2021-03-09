'use strict';

const Alias = require(`../alias`);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(`User`, {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: `users`,
    timestamps: false,
    paranoid: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Offer, {as: Alias.OFFERS, foreignKey: `userId`});
    User.hasMany(models.Comment, {as: Alias.COMMENTS, foreignKey: `userId`});
  };

  return User;
};
