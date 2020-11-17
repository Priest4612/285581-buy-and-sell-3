'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../../constants`);

const route = new Router();

const categoryRouter = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, (req, res) => {
    const categories = service.findAll();
    res.status(HttpStatusCode.OK)
      .json(categories);
  });
};


module.exports = {
  categoryRouter,
};
