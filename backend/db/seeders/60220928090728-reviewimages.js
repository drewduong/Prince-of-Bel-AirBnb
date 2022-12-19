'use strict';
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "ReviewImages"

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
        reviewId: 1,
        url: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_41/2603736/181013-skid-row-los-angeles-ew-555p.jpg'
      },
      {
        reviewId: 2,
        url: 'https://skidrow.org/wp-content/uploads/Skidrow.jpg'
      },
      {
        reviewId: 3,
        url: 'https://bloximages.chicago2.vip.townnews.com/ladowntownnews.com/content/tncms/assets/v3/editorial/7/3f/73f436ea-bafd-11e9-9251-a3db9e215be6/5d4e0213d086f.image.jpg'
      },
      {
        reviewId: 4,
        url: 'https://bloximages.chicago2.vip.townnews.com/ladowntownnews.com/content/tncms/assets/v3/editorial/7/3f/73f436ea-bafd-11e9-9251-a3db9e215be6/5d4e0213d086f.image.jpg'
      },
      {
        reviewId: 5,
        url: 'https://bloximages.chicago2.vip.townnews.com/ladowntownnews.com/content/tncms/assets/v3/editorial/7/3f/73f436ea-bafd-11e9-9251-a3db9e215be6/5d4e0213d086f.image.jpg'
      },
      {
        reviewId: 6,
        url: 'https://bloximages.chicago2.vip.townnews.com/ladowntownnews.com/content/tncms/assets/v3/editorial/7/3f/73f436ea-bafd-11e9-9251-a3db9e215be6/5d4e0213d086f.image.jpg'
      },
      {
        reviewId: 7,
        url: 'https://bloximages.chicago2.vip.townnews.com/ladowntownnews.com/content/tncms/assets/v3/editorial/7/3f/73f436ea-bafd-11e9-9251-a3db9e215be6/5d4e0213d086f.image.jpg'
      },
      {
        reviewId: 8,
        url: 'https://bloximages.chicago2.vip.townnews.com/ladowntownnews.com/content/tncms/assets/v3/editorial/7/3f/73f436ea-bafd-11e9-9251-a3db9e215be6/5d4e0213d086f.image.jpg'
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
    await queryInterface.bulkDelete(options, {
      //added all ids
      id: { [Op.in]: [5, 4, 3, 2, 1] }
    }, {});
  }
};
