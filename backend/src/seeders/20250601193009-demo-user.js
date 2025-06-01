'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        full_name: 'Achieng Otieno',
        email: 'achieng.otieno@example.com',
        phone: '0712345678',
        password: 'hashed_password_1', // Replace with hashed password if needed
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: 'Mwangi Njoroge',
        email: 'mwangi.njoroge@example.com',
        phone: '0723456789',
        password: 'hashed_password_2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: 'Fatuma Hassan',
        email: 'fatuma.hassan@example.com',
        phone: '0734567890',
        password: 'hashed_password_3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: 'Brian Kiprono',
        email: 'brian.kiprono@example.com',
        phone: '0745678901',
        password: 'hashed_password_4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
