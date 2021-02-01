'use strict';

const {HttpStatusCode} = require(`../../constants.js`);

const offerKeys = [`offerTypeId`, `title`, `sentences`, `sum`, `pictures`, `categories`, `userId`];

const offerValidator = (req, res, next) => {
  const newOffer = req.body;

  const keys = Object.keys(newOffer);
  const keysExists = offerKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpStatusCode.BAD_REQUEST)
    .send(`Bad request`);
  }

  return next();
};


module.exports = {
  offerValidator,
};
