'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/category/:id`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
offersRouter.get(`/add`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
offersRouter.get(`/edit/:id`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
offersRouter.get(`/:id`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));

module.exports = {
  offersRouter,
};
