'use strict';

const express = require(`express`);
const request = require(`supertest`);

const {HttpStatusCode} = require(`../../../constants`);
const search = require(`./search`).searchRouter;
const DataService = require(`../../data-service/search`).SearchService;

const mockData = require(`./search-test-mock.json`);

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns offer bashed on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Куплю антиквариат`,
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(`1 offer found`, () => expect(response.body.length).toBe(1));

  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`3gWWPi`));
});


test(`API return code 404 if nothing is found`,
    () => request(app)
      .get(`/search`)
      .query({
        query: `Продам свою душу`
      })
      .expect(HttpStatusCode.NOT_FOUND)
);

test(`API return 400 when query string is absent`,
    () => request(app)
      .get(`/search`)
      .expect(HttpStatusCode.BAD_REQUEST)
);
