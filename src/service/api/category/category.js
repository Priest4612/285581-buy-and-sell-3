'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../../constants`);

const route = new Router();

const categoryRouter = (app, service) => {
  app.use(`/category`, route);

  route.get(`/`, async (req, res) => {
    const {count} = req.query;

    const categories = await service.findAll(count);
    res.status(HttpStatusCode.OK)
      .json(categories);
  });
};


module.exports = {
  categoryRouter,
};
