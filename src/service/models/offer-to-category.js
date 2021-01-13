'use strict';

const {Model} = require(`sequelize`);

class OfferToCategory extends Model {

}

const define = (sequelize) => OfferToCategory.init({}, {
  sequelize,
  modelName: `OfferToCategory`,
  tableName: `offerToCategories`
});

module.exports = define;
