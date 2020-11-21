'use strict';

const {Router} = require(`express`);

const {offersRouter} = require(`./offers-routes`);
const {myRouter} = require(`./my-routes`);

const mainRouter = new Router();
const api = require(`../api`).getAPI();

mainRouter.get(`/`, async (req, res) => {
  const apiOffersData = await api.getOffers();
  res.render(`main/main`, {apiOffersData});
});

mainRouter.get(`/register`, (req, res) => res.render(`main/sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`main/login`));

mainRouter.get(`/search`, async (req, res) => {
  try {
    const {search} = req.query;
    const results = await api.search(search);
    res.render(`main/search`, {
      results
    });

  } catch (error) {
    res.render(`main/search`, {
      results: []}
    );
  }
});

mainRouter.use(`/offers`, offersRouter);
mainRouter.use(`/my`, myRouter);

module.exports = {
  mainRouter,
};
