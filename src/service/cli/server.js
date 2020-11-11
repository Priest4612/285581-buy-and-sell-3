'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const routes = require(`../api`);
const {getMockData} = require(`../lib/get-mock-data`);
const {HttpStatusCode, API_PREFIX} = require(`../../constants`);
const settings = require(`../../../settings`);

const DEFAULT_PORT = settings.DEFAULT_PORT_API;

const app = express();

app.use(express.json());
app.use(API_PREFIX, routes);

app.use((req, res) => res
  .status(HttpStatusCode.NOT_FOUND)
  .send(`Not found`));

app.use((error, req, res, _next) => res
  .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
  .send(`INTERNAL_SERVER_ERROR`));


module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    try {
      await getMockData();

      app.listen(port, (err) => {
        if (err) {
          return console.error(`Ошибка при создании сервера`, err);
        }

        return console.info(chalk.green(`Принимаю подключения на ${port}`));
      });

    } catch (err) {
      console.error(`Произошла ошибка: ${err.message}`);
      process.exit(1);
    }
  }
};
