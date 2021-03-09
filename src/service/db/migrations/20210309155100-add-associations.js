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
    return queryInterface.addColumn(
        Alias.OFFERS,
        `offerTypeId`,
        {
          type: Sequelize.INTEGER,
          references: {
            model: Alias.OFFER_TYPES,
            key: `id`
          },
          onUpdate: `CASCADE`,
          onDelete: `SET NULL`,
        }
    )
    .then(() => {
      return queryInterface.addColumn(
          Alias.OFFERS,
          `userId`,
          {
            type: Sequelize.INTEGER,
            references: {
              model: Alias.USERS,
              key: `id`
            },
            onUpdate: `CASCADE`,
            onDelete: `SET NULL`,
          }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
          Alias.PICTURES,
          `offerId`,
          {
            type: Sequelize.INTEGER,
            references: {
              model: Alias.OFFERS,
              key: `id`
            },
          }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
          Alias.COMMENTS,
          `offerId`,
          {
            type: Sequelize.INTEGER,
            references: {
              model: Alias.OFFERS,
              key: `id`
            },
          }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
          Alias.COMMENTS,
          `userId`,
          {
            type: Sequelize.INTEGER,
            references: {
              model: Alias.USERS,
              key: `id`
            },
          }
      );
    });
  },

  down: async (queryInterface, _Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn(
        Alias.OFFERS,
        `offerTypeId`,
    )
    .then(() => {
      return queryInterface.removeColumn(
          Alias.OFFERS,
          `userId`,
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
          Alias.PICTURES,
          `offerId`,
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
          Alias.COMMENTS,
          `offerId`,
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
          Alias.COMMENTS,
          `userId`,
      );
    });
  }
};
