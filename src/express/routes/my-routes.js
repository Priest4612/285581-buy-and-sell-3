'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
myRouter.get(`/comments`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));


module.exports = {
  myRouter,
};
