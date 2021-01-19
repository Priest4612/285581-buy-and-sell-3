'use strict';

const Alias = require(`../models/alias`);

class OfferService {
  constructor(sequelize) {
    this._Offer = sequelize.models.Offer;
    this._Category = sequelize.models.Category;
    this._Comment = sequelize.models.Comment;
    this._Picture = sequelize.models.Picture;
    this._User = sequelize.models.User;
  }

  async create(offerData) {
    const offer = await this._Offer.create(offerData, {include: [Alias.PICTURES]});
    await offer.addCategories(offerData.categories);
    return offer.get();
  }

  async drop(id) {
    const deleteRows = await this._Offer.destroy({
      where: {id}
    });
    return !!deleteRows;
  }

  async findAll(needComments) {
    const include = [Alias.CATEGORIES, Alias.PICTURES, Alias.OFFER_TYPES];
    if (needComments) {
      include.push({
        model: this._Comment,
        as: Alias.COMMENTS,
        include: [Alias.USERS]
      });
    }
    const offers = await this._Offer.findAll({include});
    return offers.map((item) => item.get());
  }

  async findOne(id, needComments) {
    const include = [Alias.CATEGORIES, Alias.PICTURES, Alias.OFFER_TYPES, Alias.USERS];
    if (needComments) {
      include.push({
        model: this._Comment,
        as: Alias.COMMENTS,
        include: [Alias.USERS]
      });
    }
    return await this._Offer.findByPk(id, {include});
  }

  async update(id, offer) {
    const [affectedRows] = await this._Offer.update(offer, {
      where: {id}
    });
    return !!affectedRows;
  }

}

module.exports = {
  OfferService
};
