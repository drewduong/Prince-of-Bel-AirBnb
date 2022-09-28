'use strict';

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
    */S
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 5,
        url: 'googledrive.com/hefy3',
        preview: true
      },
      {
        spotId: 4,
        url: 'googledrive.com/eq834',
        preview: true
      },
      {
        spotId: 3,
        url: 'googledrive.com/8sg3t',
        preview: true
      },
      {
        spotId: 2,
        url: 'googledrive.com/4gdss',
        preview: true
      },
      {
        spotId: 1,
        url: 'googledrive.com/h453h',
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
