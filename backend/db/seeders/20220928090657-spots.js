'use strict';
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '3650 Hayes St',
        city: 'San Leandro',
        state: 'California',
        country: 'United States of America',
        lat: 33.812511,
        lng: 117.918976,
        name: 'Sahara Resort',
        description: 'The best of the best',
        price: 345.99
      },
      {
        ownerId: 2,
        address: '1764 Paid Dr',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States of America',
        lat: 36.54161,
        lng: 45.75125,
        name: 'City Of Angels',
        description: 'Close to all your favorite resorts',
        price: 170.50
      },
      {
        ownerId: 3,
        address: '646 Joke St',
        city: 'San Happy',
        state: 'Colorado',
        country: 'United States of America',
        lat: 69.321542,
        lng: 15.489078,
        name: 'Amazing Destination',
        description: 'One of the worlds best kept secrets is here',
        price: 542.99
      },
      {
        ownerId: 4,
        address: '846 Brotherhood Cr',
        city: 'San Francisco',
        state: 'New York',
        country: 'United States of America',
        lat: 88.115566,
        lng: 76.345854,
        name: 'GetAway Now',
        description: 'No place else like this',
        price: 49.99
      },
      {
        ownerId: 5,
        address: '1250 Pepper Dr',
        city: 'San Diego',
        state: 'California',
        country: 'United States of America',
        lat: 12.154784,
        lng: 17.579254,
        name: 'Leave Your Hometown Now',
        description: 'Discoveer the best San Diego has to offer here in this lovely place',
        price: 112.47
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', {
      //added all ownerids
      ownerId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
