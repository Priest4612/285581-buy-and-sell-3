'use strict';
const Alias = require(`../alias`);

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.createTable(Alias.OFFER_TO_CATEGORIES, {});
  },


  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable(Alias.OFFER_TO_CATEGORIES);
  }
};
