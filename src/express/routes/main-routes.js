'use strict';

const {Router} = require(`express`);

const {OFFERS_PER_PAGE} = require(`../../constants`);

const {offersRouter} = require(`./offers-routes`);
const {myRouter} = require(`./my-routes`);

const mainRouter = new Router();
const api = require(`../api`).getAPI();

mainRouter.get(`/`, async (req, res) => {
  let {page = 1} = req.query;
  page = +page

  const limit = OFFERS_PER_PAGE;
  const offset = (page - 1) * OFFERS_PER_PAGE;

  const [
    {count, apiOffersData},
    apiCategoriesData
  ] = await Promise.all([
    api.getOffers({limit, offset}),
    api.getCategories({count: true})
  ]);

  const totalPages = Math.ceil(count / OFFERS_PER_PAGE);

  res.render(`main/main`, {apiOffersData, apiCategoriesData, page, totalPages});
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
