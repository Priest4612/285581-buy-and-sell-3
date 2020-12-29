'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class Category extends Model {}
  Category.init({
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    timestamps: false,
    paranoid: false,
  });

  return Category;
};
