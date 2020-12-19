'use strict';

require(`dotenv`).config();

module.exports = {
  PROJECT_DIR: __dirname,
  PUBLIC_DIR: `src/express/public`,
  TEMPLATES_DIR: `src/express/templates`,
  UPLOAD_DIR: `src/express/upload`,
  DEFAULT_PORT_FRONT: process.env.SERVER_PORT_FRONT || 8080,
  DEFAULT_PORT_API: process.env.SERVER_PORT_API || 3000,
};
