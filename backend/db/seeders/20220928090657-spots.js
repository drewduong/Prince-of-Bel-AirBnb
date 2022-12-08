'use strict';
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Spots"

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
        ownerId: 1,
        address: '3650 Soju St',
        city: 'Seoul',
        state: 'Chungcheong Province',
        country: 'Korea',
        lat: 33.812511,
        lng: 117.918976,
        name: 'Beachside Wiews',
        description: 'The best of the best. Close distance to shopping malls',
        price: 345.91
      },
      {
        ownerId: 2,
        address: '1764 Paid Dr',
        city: 'Hong Kong',
        state: 'Kowloon District',
        country: 'China',
        lat: 36.54161,
        lng: 45.75125,
        name: 'The Hong Kong Lifestyle ',
        description: 'Walking distance to all your favorite itinerary destinations',
        price: 489.32
      },
      {
        ownerId: 3,
        address: '646 PhiPhi St',
        city: 'Ko Samui',
        state: 'Surat Thani Province',
        country: 'Thailand',
        lat: 69.321542,
        lng: 15.489078,
        name: 'Thailands Very Best',
        description: 'One of the worlds best kept secrets is here',
        price: 242.87
      },
      {
        ownerId: 4,
        address: '846 Zouk Cr',
        city: 'Hougang',
        state: 'Seletar Province',
        country: 'Singapore',
        lat: 88.115566,
        lng: 76.345854,
        name: 'GetAway Now',
        description: 'No place else like this. Nearby Marina Bay Sands infamous structure',
        price: 526.15
      },
      {
        ownerId: 5,
        address: '1250 Itchiwa Dr',
        city: 'Tokyo',
        state: 'Chiba Prefecture',
        country: 'Japan',
        lat: 12.154784,
        lng: 17.579254,
        name: 'Experience Japan',
        description: 'Discoveer the best Japan has to offer here in this lovely place',
        price: 198.46
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
      //added all ownerids
      ownerId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
