'use strict';
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "SpotImages"

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
        url: 'https://jw-webmagazine.com/wp-content/uploads/2019/06/jw-5d15f1f59aae35.92188198.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i0.wp.com/milkanddust.com/wp-content/uploads/2019/07/DSC_0311.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/ac9dd1a9-3715-44b3-b9fa-0aac25672314.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://media.timeout.com/images/105685994/1024/576/image.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://www.myglobalviewpoint.com/wp-content/uploads/2021/02/16a-seoul-south-korea-rooftop-airbnb-rental.jpg',
        preview: true
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
