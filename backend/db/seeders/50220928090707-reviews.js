'use strict';
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Reviews"

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
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: 'Gorgeous and clean home with incredible amenities!',
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Their place is amazing! My family of 6 were completely comfortable and felt so fortunate to find this wonderful retreat!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 4,
        review: 'A favorite amongst many people who have stayed here. Thank you for referring me Jason.',
        stars: 5
      },
      {
        spotId: 4,
        userId: 5,
        review: 'Incredible house and easygoing hosts. The location is nice too. Quiet and relaxed area.',
        stars: 5
      },
      {
        spotId: 5,
        userId: 6,
        review: 'Beautiful house, great price to value location, clean, good host, & a well equipped gym',
        stars: 4
      },
      {
        spotId: 6,
        userId: 7,
        review: 'Cute and cozy house in a family friendly neighborhood! So many food places nearby too so this is a major win for me',
        stars: 3
      },
      {
        spotId: 7,
        userId: 8,
        review: 'Location is key and this spot checks out that requirement for me right away upon arrival. Coming back soon!',
        stars: 5
      },
      {
        spotId: 8,
        userId: 1,
        review: 'This may be my favorite stay in this city to date. Beautiful location nearby everything you are likely looking for',
        stars: 5
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
    await queryInterface.bulkDelete(options, {
      //added all ids
      id: { [Op.in]: [5, 4, 3, 2, 1] }
    }, {});
  }
};
