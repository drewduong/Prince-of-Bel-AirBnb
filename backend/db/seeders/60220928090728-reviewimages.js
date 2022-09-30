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
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 5,
        url: 'googledrive.com/vc78d'
      },
      {
        reviewId: 4,
        url: 'googledrive.com/eg84g'
      },
      {
        reviewId: 3,
        url: 'googledrive.com/gre21'
      },
      {
        reviewId: 2,
        url: 'googledrive.com/18dfe'
      },
      {
        reviewId: 1,
        url: 'googledrive.com/85eah'
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
    await queryInterface.bulkDelete('ReviewImages', {
      //added all ids
      id: { [Op.in]: [5, 4, 3, 2, 1] }
    }, {});
  }
};
