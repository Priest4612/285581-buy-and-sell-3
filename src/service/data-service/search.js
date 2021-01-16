'use strict';

class SearchService {
  constructor(sequelize) {
    this._Offers = sequelize.module.Offer;
  }

  findAll(searchText) {
    return this._offers
      .filter((offer) => offer.title.includes(searchText));
  }
}


module.exports = {
  SearchService,
};
