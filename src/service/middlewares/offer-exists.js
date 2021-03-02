'use strict';

const {HttpStatusCode} = require(`../../constants`);

const offerExists = (service) => async (req, res, next) => {
  const {offerId} = req.params;
  const offer = await service.findOne(offerId);

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
