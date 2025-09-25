'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await queryInterface.createTable('bugs', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      difficulty: {
        type: Sequelize.ENUM('Easy', 'Medium', 'Hard', 'Critical'),
        allowNull: false,
      },
      expected_outcome: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      actual_outcome: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      problem_identified: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('Open', 'In Progress', 'Testing', 'Resolved', 'Closed'),
        allowNull: false,
        defaultValue: 'Open',
      },
      resolution: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
      },
      is_favorite: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('bugs');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_bugs_difficulty";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_bugs_status";');
  }
};


