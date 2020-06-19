'use strict';

const getRandomInt = require(`./get-random-int`);

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getOneRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomElements = (array, min = 1, max = array.length - 1) => {
  return shuffle(array).slice(min, getRandomInt(min, max) + 1);
};


module.exports = {
  shuffle,
  getOneRandomElement,
  getRandomElements,
};
