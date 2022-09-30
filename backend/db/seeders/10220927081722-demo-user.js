'use strict';
const { Op } = require('sequelize')
//added to use bcrypt
const bcrypt = require("bcryptjs");

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
    await queryInterface.bulkInsert('Users', [
      { //1
        firstName: 'Henry',
        lastName: 'Jones',
        username: 'Demo-lition',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      { //2
        firstName: 'Jessica',
        lastName: 'Pham',
        username: 'FakeUser1',
        email: 'user1@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      { //3
        firstName: 'Patrick',
        lastName: 'Hanes',
        username: 'FakeUser2',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      },
      { //4
        firstName: 'Penguin',
        lastName: 'Poker',
        username: 'PokerChampion99',
        email: 'pokerstar@worldstar.com',
        hashedPassword: bcrypt.hashSync('password4')
      },
      { //5
        firstName: 'Lemon',
        lastName: 'Zest',
        username: 'Baking4Life',
        email: 'lzest@gmail.com',
        hashedPassword: bcrypt.hashSync('password5')
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
    await queryInterface.bulkDelete('Users', {
      //added other usernames
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'PokerChampion99', 'Baking4Life'] }
    }, {});
  }
};
