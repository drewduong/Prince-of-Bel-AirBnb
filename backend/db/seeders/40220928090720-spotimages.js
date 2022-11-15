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
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 5,
        url: 'https://jw-webmagazine.com/wp-content/uploads/2019/06/jw-5d15f1f59aae35.92188198.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://i0.wp.com/milkanddust.com/wp-content/uploads/2019/07/DSC_0311.jpg?resize=1024%2C681&ssl=1',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/ac9dd1a9-3715-44b3-b9fa-0aac25672314.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://media.timeout.com/images/105685994/1024/576/image.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://static.trip101.com/paragraph_media/pictures/002/406/188/large/open-uri20200114-28930-fgz8ke?1616561199',
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
    await queryInterface.bulkDelete('SpotImages', {
      //added all ids
      id: { [Op.in]: [5, 4, 3, 2, 1] }
    }, {});
  }
};
