'use strict';

const { Sequelize } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        name: 'AI',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Trends',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Innovations',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Discussions',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', {}, null);
  }
};
