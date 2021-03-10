'use strict';

const {Router} = require(`express`);
const {categoryRouter} = require(`../api/category/category`);
const {offerRouter} = require(`../api/offer/offer`);
const {searchRouter} = require(`../api/search/search`);


const {
  CategoryService,
  SearchService,
  OfferService,
  CommentService,
} = require(`../data-service`);

const {sequelize} = require(`../db/models`);

const app = new Router();

(() => {
  categoryRouter(app, new CategoryService(sequelize));
  searchRouter(app, new SearchService(sequelize));
  offerRouter(app, new OfferService(sequelize), new CommentService(sequelize));
})();


module.exports = {
  app,
};
