'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const apiOffersData = await api.getOffers({comments: false});
  res.render(`my/my-tickets`, {apiOffersData});
});


myRouter.get(`/comments`, async (req, res) => {
  const apiOffersData = await api.getOffers({comments: true});
  res.render(`my/comments`, {apiOffersData: apiOffersData.slice(0, 3)});
});


module.exports = {
  myRouter,
};
