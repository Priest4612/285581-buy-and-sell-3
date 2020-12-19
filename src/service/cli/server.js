'use strict';

const express = require(`express`);
const {testConnect} = require(`../db-service/db-connect`);

const {DEFAULT_PORT_API} = require(`../../../settings`);
const {HttpStatusCode, API_PREFIX} = require(`../../constants`);
const routes = require(`../api`).app;

const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `API`});


const DEFAULT_PORT = DEFAULT_PORT_API;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

app.use(API_PREFIX, routes);

app.use((req, res) => {
  res
    .status(HttpStatusCode.NOT_FOUND)
    .send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.use((err, req, res, _next) => {
  res
    .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    .send(`INTERNAL_SERVER_ERROR: ${err.message}`);

  logger.error(`An error occured on processing request: ${err.message}`);
});

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occured on server creation: ${err.message}`);
        }
        testConnect();
        return logger.info(`Listening to connections on ${port}`);
      });

    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
  }
};
