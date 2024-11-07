'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
    
    */
    await queryInterface.bulkInsert('Project',
      [
        {
          name: 'đasa',
          description: 'aaas',
          require: '',
          knowledgeSkills: 'sfasa',
          instuctor: 'kyus',
          status: 'đâs',
          instuctor: 'sdasd',
          userteacherId: 1,
        },{
          name: 'đasa',
          description: 'aaas',
          require: '',
          knowledgeSkills: 'sfasa',
          instuctor: 'kyzus',
          status: 'đâs',
          instuctor: 'sdavsd',
          userteacherId: 2,
        },{
          name: 'đasa',
          description: 'aaads',
          require: '',
          knowledgeSkills: 'sfdasa',
          instuctor: 'kyaus',
          status: 'đâs',
          instuctor: 'sdacsd',
          userteacherId: 3,
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
