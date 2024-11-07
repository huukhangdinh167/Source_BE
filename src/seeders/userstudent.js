'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
    
    */
    await queryInterface.bulkInsert('Userstudent',
      [
        {
          name: 'hukhen',
          phoneNumber: '32323',
          email: 'hukhang12@gmail.com',
          maSo: '2323',
          class: 'DHTTT16C',
          password: '1',
          groupStudent: '',
          groupId: '1',
          projectId: '1'
        },
        {
          name: 'hukhdfen',
          phoneNumber: '323223',
          email: 'hukhdcsang12@gmail.com',
          maSo: '20003',
          class: 'DHTTT16A',
          password: '1',
          groupStudent: '',
          groupId: '1',
          projectId: '2'
        },
        {
          name: 'hhhhukhen',
          phoneNumber: '09832323',
          email: 'hu2@gmail.com',
          maSo: '989',
          class: 'DHTTT16CSDS',
          password: '1',
          groupStudent: '',
          groupId: '1',
          projectId: '3'
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
