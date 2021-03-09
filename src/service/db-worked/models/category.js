'use strict';

const Alias = require(`../alias`);

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(`Category`, {
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
    tableName: `categories`,
    timestamps: false,
    paranoid: false,
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Offer, {through: models.OfferToCategory, as: Alias.OFFERS, foreignKey: `categoryId`});
    Category.hasMany(models.OfferToCategory, {as: Alias.OFFER_TO_CATEGORIES, foreignKey: `categoryId`});
  };

  return Category;
};
