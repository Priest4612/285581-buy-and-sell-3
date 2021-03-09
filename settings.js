'use strict';

const path = require(`path`);

module.exports = {
  PROJECT_DIR: __dirname,
  DEFAULT_FRONT_PORT: 8080,
  DEFAULT_API_PORT: 3000,
  SERVICE_FOLDER: path.resolve(__dirname, `src`, `service`),
  EXPRESS_FOLDER: path.resolve(__dirname, `src`, `express`),
};
