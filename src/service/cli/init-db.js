'use strict';

const {sequelize, initDb} = require(`../db-service/db`);

(async () => {
  await initDb();
  await sequelize.close();
})();
