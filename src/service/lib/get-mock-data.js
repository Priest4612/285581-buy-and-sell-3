'use strict';

const path = require(`path`);

const {fileUtils} = require(`../../utils`);
const {PROJECT_DIR} = require(`../../../settings`);
const FILE_NAME = `mock.json`;
let data = [];


const getMockData = async () => {
  if (data.length) {
    return Promise.resolve(data);
  }

  try {
    data = fileUtils.readJsonFileToArray(path.join(PROJECT_DIR, FILE_NAME));
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

module.exports = {
  getMockData,
};
