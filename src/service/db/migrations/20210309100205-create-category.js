'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(`categories`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable(`categories`);
  }
};
