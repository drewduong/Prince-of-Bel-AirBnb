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
        spotId: 5,
        userId: 1,
        review: 'Average stay, definitely not as advertised based on the photos',
        stars: 4
      },
      {
        spotId: 5,
        userId: 2,
        review: 'Wow, that was easily the best home I have seen so far on our honeymoon',
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Extremely loud and owner was found sneaking in the back',
        stars: 2
      },
      {
        spotId: 2,
        userId: 4,
        review: 'Would definitely recommend to other friends. Lovely stay',
        stars: 3
      },
      {
        spotId: 1,
        userId: 5,
        review: 'I am speechless this listing is even allowed to be on here',
        stars: 5
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
