'use strict';

const fs = require('fs').promises;
const path = require('path');
const { Cat } = require('../src/models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Define image paths
      const imagePaths = [
        path.join(__dirname, '..', 'catImages', 'cat_hello3_OnSeeder.jpeg'), 
        path.join(__dirname, '..', 'catImages', 'cat2_OnSeeder.jpeg'),
        path.join(__dirname, '..', 'catImages', 'cat_hello4_OnSeeder.png'),
      ];

      // Read the images and create cats

      // using some dummy metadata.
      const catData = await Promise.all(imagePaths.map(async (imagePath) => {
        const imageData = await fs.readFile(imagePath);
        return {
          name: 'Catyolo',
          metadata: JSON.stringify({ age: 2, color: 'white', cutenesslevel:'max' }),
          imageData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }));

      return queryInterface.bulkInsert('Cats', catData, {});
    } catch (err) {
      console.error('Error seeding database', err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cats', null, {});
  }
};
