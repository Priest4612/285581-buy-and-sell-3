'use strict';

const {generateCategoriesMock} = require(`./generate-categories`);
const {generateOfferTypesMock} = require(`./generate-offer-types`);
const {generateUsersMock} = require(`./generate-user`);
const {generatePicturesMock} = require(`./generate-pictures`);
const {generateOffersMock} = require(`./generate-offers`);
const {generateOfferToCategotiesMock} = require(`./generate-offer-categories`);
const {generateCommentsMock} = require(`./generate-comment`);


module.exports = {
  generateCategoriesMock,
  generateOfferTypesMock,
  generateUsersMock,
  generatePicturesMock,
  generateOffersMock,
  generateOfferToCategotiesMock,
  generateCommentsMock,
};
