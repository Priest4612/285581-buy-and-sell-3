'use strict';

const path = require(`path`);

const {getLogger} = require(`../lib/logger`);
const {fileUtils} = require(`../../utils`);
const {PROJECT_DIR} = require(`../../../settings`);
const FILE_NAME = `mock.json`;
let data = [];

const logger = getLogger({name: `GET-MOCK-DATA`});

const getMockData = async () => {
  if (data.length) {
    return Promise.resolve(data);
  }

  try {
    data = fileUtils.readJsonFileToArray(path.join(PROJECT_DIR, FILE_NAME));
  } catch (err) {
    logger.error(err);
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

module.exports = {
  getMockData,
};
