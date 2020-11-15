'use strict';

const {HttpStatusCode} = require(`../../constants`);

const offerExists = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const offer = service.findOne(offerId);

  if (!offer) {
    return res.status(HttpStatusCode.NOT_FOUND)
      .send(`Offer with ${offerId} not found`);
  }

  res.locals.offer = offer;
  return next();
};


module.exports = {
  offerExists,
};
