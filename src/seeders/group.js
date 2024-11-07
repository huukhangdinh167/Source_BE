'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
    
    */
    await queryInterface.bulkInsert('Group',
      [
        {
          name: 'Student',
          description: ''
          
        }, 
        {
          name: 'Teacher',
          description: ''
          
        }, {
          name: 'Admin',
          description: ''
          
        },{
          name: 'Master teacher',
          description: ''
          
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
