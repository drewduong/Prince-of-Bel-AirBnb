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
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 5,
        userId: 1,
        startDate: '2023-07-13 13:00:00',
        endDate: '2023-07-20 11:00:00'
      },
      {
        spotId: 4,
        userId: 2,
        startDate: '2022-10-13 15:00:00',
        endDate: '2022-10-17 10:00:00'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2022-11-22 12:00:00',
        endDate: '2023-11-24 13:00:00'
      },
      {
        spotId: 2,
        userId: 4,
        startDate: '2022-09-29 12:00:00',
        endDate: '2023-10-05 11:30:00'
      },
      {
        spotId: 1,
        userId: 5,
        startDate: '2022-12-22 15:30:00',
        endDate: '2022-12-29 :00:00'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', {
      //added all ids
      id: { [Op.in]: [5, 4, 3, 2, 1] }
    }, {});
  }
};
