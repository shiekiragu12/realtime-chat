'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('messages', [
      {
        sender_id: 3,
        receiver_id: 1,
        content: 'Habari yako? Nilikuwa nauliza kuhusu mkutano wa kesho.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sender_id: 2,
        receiver_id: 1,
        content: 'Sawa basi, tutaonana saa nne asubuhi.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sender_id: 3,
        receiver_id: 2,
        content: 'Nimepata ujumbe wako. Ahsante sana!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sender_id: 1,
        receiver_id: 3,
        content: 'Tafadhali nitumie faili la jana.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Messages', null, {});
  }
};
