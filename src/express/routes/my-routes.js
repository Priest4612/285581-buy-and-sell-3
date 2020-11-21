'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const apiOffersData = await api.getOffers();
  res.render(`my/comments`, {apiOffersData});
});


myRouter.get(`/comments`, async (req, res) => {
  const apiOffersData = await api.getOffers();
  res.render(`my/comments`, {apiOffersData: apiOffersData.slice(0, 3)});
});


module.exports = {
  myRouter,
};
