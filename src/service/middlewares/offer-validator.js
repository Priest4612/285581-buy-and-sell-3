'use strict';

const {HttpStatusCode} = require(`../../constants.js`);

const offerKeys = [`offerTypeId`, `title`, `sentences`, `sum`, `pictures`, `categories`, `userId`];

const offerValidator = (req, res, next) => {
  console.log(`Валидатор: ${newOffer}`);
  const keys = Object.keys(newOffer);
  const keysExists = offerKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpStatusCode.BAD_REQUEST)
    .send(`Bad request`);
  }

  const newOffer = req.body;
  return next();
};


module.exports = {
  offerValidator,
};
