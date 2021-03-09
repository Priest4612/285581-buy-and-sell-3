'use strict';
module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(`offerTypes`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable(`offerTypes`);
  }
};
