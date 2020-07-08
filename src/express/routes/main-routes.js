'use strict';

const {Router} = require(`express`);


const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
mainRouter.get(`/register`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
mainRouter.get(`/login`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
mainRouter.get(`/search`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));


module.exports = {
  mainRouter,
};
