'use strict';

const {Router} = require(`express`);
const {categoryRouter} = require(`../api/category`);
const {offerRouter} = require(`../api/offer`);
const {searchRouter} = require(`../api/search`);

const {getMockData} = require(`../lib/get-mock-data`);

const {
  CategoryService,
  SearchService,
  OfferService,
  CommentService,
} = require(`../data-service`);

const app = new Router();

(async () =>{
  const mockData = await getMockData();

  categoryRouter(app, new CategoryService(mockData));
  searchRouter(app, new SearchService(mockData));
  offerRouter(app, new OfferService(mockData), new CommentService());
})();


module.exports = {
  app,
};
