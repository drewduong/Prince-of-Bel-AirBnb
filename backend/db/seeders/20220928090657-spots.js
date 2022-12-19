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
        name: 'Beachside Views',
        description: 'The best of the best. Aesthetic-looking rooms. Close distance to shopping malls',
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
        description: 'Nearby street food vendors to satisfy late night cravings. Relatively close to all major destination spots',
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
        name: 'Experience Japan Here',
        description: 'Discover the best Japan has to offer here at this lovely place. Next to the Shibuya Crossing',
        price: 198.46
      },
      {
        ownerId: 6,
        address: '1728 Nawa St',
        city: 'Denpasar',
        state: 'Bali Prefecture',
        country: 'Indonesia',
        lat: 65.154784,
        lng: 17.579254,
        name: 'Illuminating Serene Home',
        description: 'Large master bedroom with large scale pool outside the villa',
        price: 278.22
      },
      {
        ownerId: 7,
        address: '831 Thai Dr',
        city: 'Saigon',
        state: 'Hoc Mon District',
        country: 'Vietnam',
        lat: 12.154784,
        lng: 17.579254,
        name: 'Warm Tropical Oasis',
        description: 'Spacious well lit home with open floor panel and decadent views',
        price: 431.49
      },
      {
        ownerId: 8,
        address: '1250 Itchiwa Dr',
        city: 'Dubai',
        state: 'Abu Dhabi',
        country: 'United Arab Emirates',
        lat: 12.154784,
        lng: 17.579254,
        name: 'Upscale Spacious Home',
        description: 'Five bedroom home with indoor pool and two story balcony',
        price: 680.28
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
