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
        reviewId: 1,
        url: 'https://nextluxury.com/wp-content/uploads/masculine-designs-loft-ideas.jpg'
      },
      {
        reviewId: 2,
        url: 'https://i.ytimg.com/vi/ddkxfZtWzDA/maxresdefault.jpg'
      },
      {
        reviewId: 3,
        url: 'https://thesmartlocal.com/images/easyblog_articles/5844/image11.jpg'
      },
      {
        reviewId: 4,
        url: 'https://www.myglobalviewpoint.com/wp-content/uploads/2021/02/16a-seoul-south-korea-rooftop-airbnb-rental.jpg'
      },
      {
        reviewId: 5,
        url: 'https://www.jonesaroundtheworld.com/wp-content/uploads/2019/11/Unique-Airbnbs-in-Singapore-2020.jpg'
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
    await queryInterface.bulkDelete('ReviewImages', {
      //added all ids
      id: { [Op.in]: [5, 4, 3, 2, 1] }
    }, {});
  }
};
