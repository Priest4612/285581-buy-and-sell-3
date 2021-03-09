'use strict';

module.exports = (sequelize) => {
  const OfferToCategory = sequelize.define(`OfferToCategory`, {}, {
    sequelize,
    tableName: `offerToCategories`,
    timestamps: false,
    paranoid: false,
  });

  return OfferToCategory;
};
