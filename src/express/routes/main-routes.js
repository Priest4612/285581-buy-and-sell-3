'use strict';

const {Router} = require(`express`);

const {offersRouter} = require(`./offers-routes`);
const {myRouter} = require(`./my-routes`);

const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
mainRouter.get(`/register`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
mainRouter.get(`/login`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
mainRouter.get(`/search`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));

mainRouter.use(`/offers`, offersRouter);
mainRouter.use(`/my`, myRouter);

module.exports = {
  mainRouter,
};
