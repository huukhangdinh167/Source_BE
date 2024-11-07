'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Assignment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupStudent: {
        type: Sequelize.STRING
      },
      idUserStudent1: {
        type: Sequelize.INTEGER
      },
      IdUserStudent2: {
        type: Sequelize.INTEGER
      },
      idProject: {

        type: Sequelize.INTEGER
      },
      projectNameFinall: {

        type: Sequelize.STRING
      },
      idGVHD: {
        type: Sequelize.INTEGER
      },
      idGVPB1: {
        type: Sequelize.INTEGER
      },
      idGVPB2: {
        type: Sequelize.INTEGER
      },
      idCTHD: {
        type: Sequelize.INTEGER
      },
      idTK: {
        type: Sequelize.INTEGER
      },
      idUV: {
        type: Sequelize.INTEGER
      },
      idPoster1: {
        type: Sequelize.INTEGER
      },
      idPoster2: {
        type: Sequelize.INTEGER
      },
      semester: {
        type: Sequelize.STRING
      },
      ngayHD: {
        type: Sequelize.STRING
      },


    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Assignment');
  }
};