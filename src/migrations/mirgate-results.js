'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Result', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupStdent: {
        type: Sequelize.STRING
      },
      diemGVHD: {
        type: Sequelize.STRING
      },
      diemGVPB1: {
        type: Sequelize.STRING
      },
      diemGVPB2: {
        type: Sequelize.STRING
      },
      diemCTHD: {
        type: Sequelize.STRING
      },
      diemTK: {
        type: Sequelize.STRING
      },
      diemUV: {
        type: Sequelize.STRING
      },
      diemPoster1: {
        type: Sequelize.STRING
      },
      diemPoster2: {
        type: Sequelize.STRING
      },


      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Result');
  }
};