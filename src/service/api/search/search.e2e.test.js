'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../../lib/init-db`);
const search = require(`./search`).searchRouter;
const DataService = require(`../../data-service/search`).SearchService;

const {HttpStatusCode} = require(`../../../constants`);

const {users, offers, offerTypes, categories} = require(`./search-test-mock`);

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {users, offers, offerTypes, categories});
  const app = express();
  app.use(express.json());
  search(app, new DataService(mockDB));
  return app;
};

describe(`API returns offer bashed on search query`, () => {
  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
    .get(`/search`)
    .query({
      query: `Куплю детские санки.`
    });
  });


  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(`1 offer found`, () => expect(response.body.length).toBe(1));

  test(`Offer has correct id`, () => expect(response.body[0].title).toBe(`Куплю детские санки.`));
});


test(`API return code 404 if nothing is found`, async () => {
  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
    .get(`/search`)
    .query({
      query: `Продам свою душу`
    });
  });

  return () => expect(response.statusCode).toBe(HttpStatusCode.NOT_FOUND);
});

test(`API return 400 when query string is absent`, async () => {
  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
    .get(`/search`);
  });

  return () => expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
});
