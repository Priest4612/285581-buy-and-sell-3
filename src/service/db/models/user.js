'use strict';
const {Model} = require(`sequelize`);
const Alias = require(`../alias`);

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
      User.hasMany(models.Offer, {as: Alias.OFFERS, foreignKey: `userId`});
      User.hasMany(models.Comment, {as: Alias.COMMENTS, foreignKey: `userId`});
    }
  }

  User.init({
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
    modelName: `User`,
    tableName: `users`,
    timestamps: false,
    paranoid: false,
  });

  return User;
};
