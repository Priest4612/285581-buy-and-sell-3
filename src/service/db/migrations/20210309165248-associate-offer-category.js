'use strict';
const Alias = require(`../alias`);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable(Alias.OFFER_TO_CATEGORIES, {
      offerId: {
        type: Sequelize.INTEGER,
        primaryKey: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        primaryKey: false,
      },
    });
  },


  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable(Alias.OFFER_TO_CATEGORIES);
  }
};
