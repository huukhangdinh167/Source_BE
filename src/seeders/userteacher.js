'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
    
    */
    await queryInterface.bulkInsert('Userteacher',
      [
        {
          name: 'tran van a',
          phoneNumber: '909',
          email: 'fđfd',
          maSo: '5464',
          password: '1',
          groupId: 2,
        }, 
        {
          name: 'tran vacxn hgha',
          phoneNumber: '909',
          email: 'fđfd',
          maSo: '5464',
          password: '1',
          groupId: 2,
        },
        {
          name: 'tracxn xcvan gkba',
          phoneNumber: '90sss9',
          email: 'fđfd',
          maSo: '5464',
          password: '1',
          groupId: 2,
        },
        {
          name: 'travxxn vaxn gkba',
          phoneNumber: '90v69',
          email: 'fđfd',
          maSo: '5464',
          password: '1',
          groupId: 2,
        },
        {
          name: 'trsdsan vaan gkba',
          phoneNumber: '909787',
          email: 'fđfd',
          maSo: '5464',
          password: '1',
          groupId: 2,
        },
        {
          name: 'tran van ấgkba',
          phoneNumber: '905569',
          email: 'fđfd',
          maSo: '5464',
          password: '1',
          groupId: 2,
        }
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
