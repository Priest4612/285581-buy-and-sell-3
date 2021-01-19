'use strict';

const Sequelize = require(`sequelize`);
const Alias = require(`../models/alias`);

class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
    this._OfferToCategory = sequelize.models.OfferToCategory;
  }

  async findAll(needCount) {
    if (needCount) {
      const result = await this._Category.findAll({
        attributes: [
          `id`,
          `name`,
          `picture`,
          [
            Sequelize.fn(
                `COUNT`,
                `*`
            ),
            `count`
          ]
        ],
        group: [Sequelize.col(`Category.id`)],
        include: [{
          model: this._OfferToCategory,
          as: Alias.OFFER_TO_CATEGORIES,
          attributes: []
        }]
      });
      return await result.map((it) => it.get());
    } else {
      return await this._Category.findAll({raw: true});
    }
  }
}


module.exports = {
  CategoryService,
};
