'use strict';

const chalk = require(`chalk`);
const path = require(`path`);
const http = require(`http`);

const {fileUtils} = require(`../../utils`);
const {HttpCode} = require(`../../constants`);
const {PROJECT_DIR} = require(`../../../settings`);

const DEFAULT_PORT = 3000;
const FILE_NAME = `mock.json`;


const sendResponse = (res, statusCode, message) => {
  const template = `
  <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>With love from Node</title>
    </head>
    <body>
      ${message}
    </body>
  </html>
  `.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientContent = async (req, res) => {
  const notFoundMessageText = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const mocks = await fileUtils.readJsonFileToArray(path.join(PROJECT_DIR, FILE_NAME));
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      }
      break;

    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      break;
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onClientContent)
      .listen(port).on(`listening`, (err) => {
        if (err) {
          return console.log(`Ошибка при создании сервера`, err);
        }
        return console.info(chalk.gray(`Ожидаю соединений на порт ${port}`));
      });
  }
};
