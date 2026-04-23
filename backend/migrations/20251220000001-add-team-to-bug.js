'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('bugs', 'team', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Default'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('bugs', 'team');
  }
};
