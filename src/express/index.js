'use strict';
const express = require(`express`);
const settings = require(`../../settings`);
const {mainRouter} = require(`./routes/main-routes`);
const {myRouter} = require(`./routes/my-routes`);
const {offersRouter} = require(`./routes/offers-routes`);


const DEFAULT_PORT = settings.DEFAULT_PORT;

const app = express();

app.use(`/offers`, offersRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);


app.listen(DEFAULT_PORT,
    () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
