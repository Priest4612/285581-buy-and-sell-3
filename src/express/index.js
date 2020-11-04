'use strict';
const path = require(`path`);
const express = require(`express`);
const settings = require(`../../settings`);
const {mainRouter} = require(`./routes/main-routes`);


// Инициализация сервера...
const DEFAULT_PORT = settings.DEFAULT_PORT;
const PUBLIC_DIR = `public`;
const TEMPLATES_DIR = `templates`;

const app = express();

app.set(`view engine`, `pug`);
app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/`, mainRouter);

app.listen(DEFAULT_PORT,
    () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
