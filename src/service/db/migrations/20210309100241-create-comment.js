'use strict';
const Alias = require(`../alias`);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(Alias.COMMENTS, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable(Alias.COMMENTS);
  }
};
