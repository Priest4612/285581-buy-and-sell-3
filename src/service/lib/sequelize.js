'use strict';

const Sequelize = require(`sequelize`);
const {DB_NAME, DB_USER, USER_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT} = process.env;


const somethingIsNotDefined = [DB_NAME, DB_USER, USER_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT]
      .some((it) => it === undefined);

if (somethingIsNotDefined) {
  throw new Error(`One or more environmental variables are not defined`);
}

const sequelize = new Sequelize(
    DB_NAME, DB_USER, USER_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: DB_DIALECT,
      pool: {
        max: 5,
        min: 0,
        acquire: 10000,
        idle: 1000
      },
    }
);


module.exports = {
  sequelize,
};
