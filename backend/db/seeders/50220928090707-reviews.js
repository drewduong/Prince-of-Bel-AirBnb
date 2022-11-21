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
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: 'One of the best stays ever',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'This place was okay',
        stars: 4
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Wish it was better cleaned',
        stars: 3
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
    await queryInterface.bulkDelete('Reviews', {
      //added all ids
      id: { [Op.in]: [5, 4, 3, 2, 1] }
    }, {});
  }
};
