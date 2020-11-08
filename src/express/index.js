'use strict';
const path = require(`path`);
const express = require(`express`);

const settings = require(`../../settings`);
const {mainRouter} = require(`./routes/main-routes`);
const {HttpStatusCode} = require(`../constants.js`);

// Инициализация сервера...
const DEFAULT_PORT = settings.DEFAULT_PORT;
const PROJECT_DIR = settings.PROJECT_DIR;
const PUBLIC_DIR = settings.PUBLIC_DIR;
const TEMPLATES_DIR = settings.TEMPLATES_DIR;

const app = express();

app.set(`view engine`, `pug`);
app.set(`views`, path.resolve(PROJECT_DIR, TEMPLATES_DIR));

app.use(express.static(path.resolve(PROJECT_DIR, PUBLIC_DIR)));

app.use(`/`, mainRouter);
app.use((req, res) => res.status(HttpStatusCode.NOT_FOUND).render(`errors/404`));
app.use((error, req, res) => res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).render(`errors/500`));

app.listen(DEFAULT_PORT,
    () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
