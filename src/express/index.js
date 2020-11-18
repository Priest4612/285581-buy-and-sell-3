'use strict';
const path = require(`path`);
const express = require(`express`);

const {getLogger} = require(`../service/lib/logger`);

const settings = require(`../../settings`);
const mainRouter = require(`./routes/main-routes`).mainRouter;
const {HttpStatusCode} = require(`../constants.js`);

// Инициализация сервера...
const DEFAULT_PORT = settings.DEFAULT_PORT_FRONT;
const PROJECT_DIR = settings.PROJECT_DIR;
const PUBLIC_DIR = settings.PUBLIC_DIR;
const TEMPLATES_DIR = settings.TEMPLATES_DIR;

const logger = getLogger({name: `EXPRESS`});
const app = express();

app.use(express.static(path.resolve(PROJECT_DIR, PUBLIC_DIR)));

app.use(`/`, mainRouter);

app.use((req, res) => res.status(HttpStatusCode.BAD_REQUEST).render(`errors/404`));

app.use((err, _req, res, _next) => {
  logger.error(`errors/500: ${err}`);
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
});

app.set(`views`, path.resolve(PROJECT_DIR, TEMPLATES_DIR));
app.set(`view engine`, `pug`);

app.listen(process.env.PORT || DEFAULT_PORT,
    () => logger.info(`Сервер запущен на порту: ${DEFAULT_PORT}`));
