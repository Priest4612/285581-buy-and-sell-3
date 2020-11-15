'use strict';

const express = require(`express`);
const request = require(`supertest`);

const {HttpStatusCode} = require(`../../../constants`);
const category = require(`./category`).categoryRouter;
const DataService = require(`../../data-service`).CategoryService;

const mockData = require(`./category-test-mock.json`);

const app = express();
app.use(express.json());
category(app, new DataService(mockData));

describe(`API return category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(`Return list of 4 categories`, () => expect(response.body.length).toBe(4));

  test(`Category names are "Животные", "Книги", "Разное", "Посуда"`,
      () => expect(response.body).toEqual(
          expect.arrayContaining([`Животные`, `Книги`, `Разное`, `Посуда`])
      )
  );
});
