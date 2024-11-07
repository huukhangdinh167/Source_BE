'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
    
    */
    await queryInterface.bulkInsert('Group_Role',
      [
        {
          roleId: 1,
          groupId: 1,
          
        }, 
        {
          roleId: 2,
          groupId: 2,
          
        }, 
        {
          roleId: 3,
          groupId: 3,
          
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
