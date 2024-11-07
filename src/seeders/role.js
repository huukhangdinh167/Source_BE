'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
    
    */
    await queryInterface.bulkInsert('Role',
      [
        {
          url: '/user/read',
          description: '',
          
        },
        {
          url: '/user/edit',
          description: '',
          
        }, 
        {
          url: '/user/delete',
          description: '',
          
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
