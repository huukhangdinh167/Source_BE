'use strict';



module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Project', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      require: {
        type: Sequelize.STRING
      }, 

      knowledgeSkills: {
        type: Sequelize.STRING
      },
      instuctor: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      userteacherId: {
        type: Sequelize.INTEGER
      },


      startDate: {
        type: Sequelize.STRING
      },
      customerId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Project');
  }
};