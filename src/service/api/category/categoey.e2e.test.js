'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../../lib/init-db`);
const category = require(`./category`).categoryRouter;
const DataService = require(`../../data-service`).CategoryService;

const {HttpStatusCode} = require(`../../../constants`);

const {users, offers, offerTypes, categories} = require(`./category-test-mock`);

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {offerTypes, categories, users, offers});
  const app = express();
  app.use(express.json());
  category(app, new DataService(mockDB));
  return app;
};

describe(`API return category list`, () => {
  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .get(`/category`);
  });

  test(`Status code 200`, async () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(`Return list of 6 categories`, async () => expect(response.body.length).toBe(6));

  test(`Category names are "Животные", "Книги", "Разное", "Посуда"`,
      async () => expect(response.body.map((it) => it.name)).toEqual(
          expect.arrayContaining([`Животные`, `Игры`, `Разное`, `Посуда`, `Книги`, `Журналы`])
      )
  );
});
