'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
    
    */
    await queryInterface.bulkInsert('Result',
      [
        {
          groupStudent: '',
          diemGVHD: '8',
          diemGVPB1: '5',
          diemGVPB2: '8',
          diemCTHD: '5',
          diemTK: '8',
          diemUV: '5',
          diemPoster1: '8',
          diemPoster2: '9',
        },
        {
          groupStudent: '',
          diemGVHD: '8',
          diemGVPB1: '5',
          diemGVPB2: '8',
          diemCTHD: '5',
          diemTK: '8',
          diemUV: '5',
          diemPoster1: '8',
          diemPoster2: '9',
        },
        {
          groupStudent: '',
          diemGVHD: '8',
          diemGVPB1: '5',
          diemGVPB2: '8',
          diemCTHD: '5',
          diemTK: '8',
          diemUV: '5',
          diemPoster1: '8',
          diemPoster2: '9',
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
