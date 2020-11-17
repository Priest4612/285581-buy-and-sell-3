'use strict';

const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `HELP`});

module.exports = {
  name: `--help`,
  run() {
    const text = `
      Программа запускает http-сервер и формирует файл с данными для API.

      Гайд:
      service.js <command>

      Команды:
      --version:            выводит номер версии
      --help:               печатает этот текст
      --generate <count>    формирует файл mocks.json
      --server <port>       запускает сервер
    `;

    logger.info(text);
  }
};
