'use strict';

const getRandomInt = require(`./get-random-int`);

const changeNumberFormat = (number) => number < 10 ? `0${number}` : `${number}`;

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = changeNumberFormat(date.getMonth() + 1);
  const day = changeNumberFormat(date.getDate());
  const hours = changeNumberFormat(date.getHours());
  const minutes = changeNumberFormat(date.getMinutes());
  const seconds = changeNumberFormat(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const getRandomDate = (min, max) => {
  const date = new Date();
  const dateArticle = new Date(date.getTime() - Math.random() * getRandomInt(min, max) * 24 * 30 * 60 * 60 * 1000);

  return formatDate(dateArticle);
};

const getTime = (date) => {
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${hours}:${minutes}`;
};


module.exports = {
  getRandomDate,
  getTime,
  formatDate,
};
