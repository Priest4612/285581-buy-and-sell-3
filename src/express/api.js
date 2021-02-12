'use strict';

const axios = require(`axios`);

const {DEFAULT_API_PORT} = require(`../../settings`);

const TIMEOUT = 1000;

const port = process.env.API_PORT || DEFAULT_API_PORT;
const defaultURL = `http://localhost:${port}/api/`;

class API {

  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  getOffers({limit, offset, comments}) {
    return this._load(`/offers`, {params: {limit, offset, comments}});
  }

  async getOffersToCategory(categoryId) {
    return await this._load(`/offers/category/${categoryId}`);
  }

  async getOffer(id, comments) {
    return await this._load(`/offers/${id}`, {params: {comments}});
  }

  async search(query) {
    return await this._load(`/search`, {params: {query}});
  }

  async getCategories(count) {
    return await this._load(`/category`, {params: {count}});
  }

  async createOffer(data) {
    return this._load(`/offers`, {
      method: `POST`,
      data
    });
  }
}

const defaultAPI = new API(defaultURL, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI,
};
