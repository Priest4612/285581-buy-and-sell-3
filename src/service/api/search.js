'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../constants`);

const route = new Router();

const searchRouter = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      res.status(HttpStatusCode.BAD_REQUEST)
        .json([]);
      return;
    }

    const searchResults = service.findAll(query);
    const searchStatus = searchResults.length > 0 ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND;

    res.status(searchStatus)
      .json(searchStatus);
  });
};


module.exports = {
  searchRouter,
};
