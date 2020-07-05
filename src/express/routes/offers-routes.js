'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/category/:id`, (req, res) => res.send(`/category/:id`));
offersRouter.get(`/add`, (req, res) => res.send(`/add`));
offersRouter.get(`/edit/:id`, (req, res) => res.send(`/edit/:id`));
offersRouter.get(`/offers/:id`, (req, res) => res.send(`/offers/:id`));

module.exports = {
  offersRouter,
};
