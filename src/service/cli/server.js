'use strict';

const chalk = require(`chalk`);
const path = require(`path`);
const express = require(`express`);

const {fileUtils} = require(`../../utils`);
const {HttpStatusCode} = require(`../../constants`);
const {PROJECT_DIR} = require(`../../../settings`);

const DEFAULT_PORT = 3000;
const FILE_NAME = `mock.json`;

const app = express();
app.use(express.json());

app.get(`/offers`, async (req, res) => {
  try {
    const offers = await fileUtils.readJsonFileToArray(path.join(PROJECT_DIR, FILE_NAME));
    res.json(offers);
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

app.use((req, res) => res.status(HttpStatusCode.NOT_FOUND).send(`Not found`));
app.use((error, req, res, _next) => res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).render(`errors/500`));

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, () => console.info(chalk.green(`Принимаю подключения на ${ port }`)));
  }
};
