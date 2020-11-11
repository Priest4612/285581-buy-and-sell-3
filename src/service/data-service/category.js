'use strict';

class CategoryService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll() {
    const categories = this._offers.redice((acc, offers) => {
      acc.add(...offers.category);
      return acc;
    }, new Set());

    return [...categories];
  }
}


module.exports = {
  CategoryService,
};
