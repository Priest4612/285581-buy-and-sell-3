'use strict';

const {ExitCode} = require(`../../constants`);


const {generateCategoriesMock} = require(`./generators/generate-categories`);
const {generateOfferTypesMock} = require(`./generators/generate-offer-types`);
const {generateUsersMock} = require(`./generators/generate-user`);
const {generatePicturesMock} = require(`./generators/generate-pictures`);
const {generateOffersMock} = require(`./generators/generate-offers`);
const {generateOfferToCategotiesMock} = require(`./generators/generate-offer-categories`);
const {generateCommentsMock} = require(`./generators/generate-comment`);

const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `GENERATE-DB-MOCKS`});

module.exports = {
  name: `--generate-db-mocks`,
  async run() {
    try {
      logger.info(`генерируем моковые данные для базы данных`);
      await generateCategoriesMock();
      await generateOfferTypesMock();
      await generateUsersMock();
      await generateOffersMock();
      await generatePicturesMock();
      await generateOfferToCategotiesMock();
      await generateCommentsMock();
    } catch (err) {
      logger.error(err);
      process.exit(ExitCode.ERROR);
    }
  }
};
