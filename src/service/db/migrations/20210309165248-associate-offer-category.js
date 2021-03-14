'use strict';
const Alias = require(`../alias`);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        Alias.OFFER_TO_CATEGORIES,
        `offerId`,
        {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: Alias.OFFERS,
            key: `id`
          },
        },
    )
    .then(() => {
      return queryInterface.addColumn(
          Alias.OFFER_TO_CATEGORIES,
          `categoryId`,
          {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
              model: Alias.CATEGORIES,
              key: `id`
            },
          },
      );
    });
  },
  down: async (queryInterface, _Sequelize) => {
    return queryInterface.removeColumn(
        Alias.OFFER_TO_CATEGORIES,
        `offerId`,
    )
    .then(() => {
      return queryInterface.removeColumn(
          Alias.OFFER_TO_CATEGORIES,
          `categoryId`,
      );
    });
  }
};
