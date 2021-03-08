'use strict';
const express = require(`express`);
const helmet = require(`helmet`);
const path = require(`path`);
const {mainRouter} = require(`./routes/main-routes`);
const {getLogger} = require(`../service/lib/logger`);
const {
  DEFAULT_FRONT_PORT,
} = require(`../../settings`);
const {
  HttpStatusCode,
  FrontDir: {
    PUBLIC_DIR,
    TEMPLATES_DIR,
    UPLOAD_DIR
  }
} = require(`../constants.js`);


const port = process.env.FRONT_PORT || DEFAULT_FRONT_PORT;
const logger = getLogger({name: `EXPRESS`});
const app = express();

app.use(`/`, mainRouter);
app.use(express.static(path.resolve(PUBLIC_DIR)));
app.use(express.static(path.resolve(UPLOAD_DIR)));

app.use((req, res) => res.status(HttpStatusCode.BAD_REQUEST).render(`errors/404`));

app.use((err, _req, res, _next) => {
  logger.error(`errors/500: ${err}`);
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
});

app.set(`views`, path.resolve(TEMPLATES_DIR));
app.set(`view engine`, `pug`);

app.use(helmet.xssFilter());
app.use(helmet.contentSecurityPolicy({
  directive: {
    defaultSrc: [`'self'`],
    scriptSrc: [`'self'`],
  },
}));

app.listen(port,
    () => logger.info(`Сервер запущен на порту: ${port}`));
