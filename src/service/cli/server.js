'use strict';

const express = require(`express`);
const {sequelize} = require(`../lib/sequelize`);

const {DEFAULT_PORT_API} = require(`../../../settings`);
const {HttpStatusCode, API_PREFIX, ExitCode} = require(`../../constants`);
const routes = require(`../api`).app;
const {getLogger} = require(`../lib/logger`);


const logger = getLogger({name: `API`});
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
    const DEFAULT_PORT = process.env.API_PORT || DEFAULT_PORT_API;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    try {
      logger.info(`Подключение к базе данных...`);
      await sequelize.authenticate();
      logger.info(`Соединение с базой данных установлено`);
    } catch (err) {
      logger.error(`Произошла ошибка: ${err}`);
      process.exit(ExitCode.ERROR);
    }

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occured on server creation: ${err.message}`);
        }
        return logger.info(`Listening to connections on ${port}`);
      });
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(ExitCode.ERROR);
    }
  }
};
