'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
    
    */
    await queryInterface.bulkInsert('Assignment',
      [
        {
          groupStudent: '',
          idUserStudent1: 1,
          IdUserStudent2: 2,
          idProject: 1,
          projectNameFinall: '',
          idGVHD: 1,
          idGVPB1: 2,
          idGVPB2: 4,
          idCTHD: 5,
          idTK: '',
          idUV: '',
          idPoster1: '',
          idPoster2: '',
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
