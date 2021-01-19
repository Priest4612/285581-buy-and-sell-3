'use strict';

const {Router} = require(`express`);

const {offersRouter} = require(`./offers-routes`);
const {myRouter} = require(`./my-routes`);

const mainRouter = new Router();
const api = require(`../api`).getAPI();

mainRouter.get(`/`, async (req, res) => {
  const [
    apiOffersData,
    apiCategoriesData
  ] = await Promise.all([
    api.getOffers({comments: true}),
    api.getCategories({count: true})
  ]);

  res.render(`main/main`, {apiOffersData, apiCategoriesData});
});

mainRouter.get(`/register`, (req, res) => res.render(`main/sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`main/login`));

mainRouter.get(`/search`, async (req, res) => {
  const {search} = req.query;

  try {
    const results = await api.search(search);
    res.render(`main/search`, {search,
      results
    });
  } catch (error) {
    res.render(`main/search`, {search,
      results: []
    });
  }
});

mainRouter.use(`/offers`, offersRouter);
mainRouter.use(`/my`, myRouter);

module.exports = {
  mainRouter,
};
