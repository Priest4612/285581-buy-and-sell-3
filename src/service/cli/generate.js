'use strict';
const fs = require(`fs`);
const path = require(`path`);

const {Utils} = require(`../../utils`);
const {getRandomInt, shuffle} = Utils;
const {ExitCode} = require(`../../constants`);
const {PROJECT_DIR} = require(`../../../settings`);

const offerRestrict = {
  DEFAULT_COUNT: 1,
  MAX_COUNT: 1000,
};


const FILE_NAME = path.join(PROJECT_DIR, `mock.json`);

const TITLES = [
  `Продам книги Стивена Кинга.`,
  `Продам новую приставку Sony Playstation 5.`,
  `Продам отличную подборку фильмов на VHS.`,
  `Куплю антиквариат.`,
  `Куплю породистого кота.`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const getPictureFileName = (number) => number > 10 ? `item${number}.jpg` : `item0${number}.jpg`;

const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const generateOffers = (count) => {
  return Array(count).fill({}).map(() => ({
    type: Object.keys(OfferType)[getRandomInt(0, Object.keys(OfferType).length - 1)],
    title: getRandomElement(TITLES),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    category: [getRandomElement(CATEGORIES)],
  }));
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || offerRestrict.DEFAULT_COUNT;

    if (countOffer <= offerRestrict.MAX_COUNT) {
      const content = JSON.stringify(generateOffers(countOffer));
      fs.writeFile(FILE_NAME, content, (err) => {
        console.log(process.env.INIT_CWD);
        if (err) {
          console.error(`Can't write data file...`);
          return process.exit(ExitCode.ERROR);
        }
        return console.log(`Operation success. File created.`);
      });
    } else {
      console.log(`Не больше 1000 объявлений.`);
      process.exit(ExitCode.ERROR);
    }
  }
};
