'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //  Project.belongsToMany(models.User, {through: 'Project_User'})
      Project.hasMany(models.Userstudent, { foreignKey: 'projectId' })
      Project.belongsTo(models.Userteacher, { foreignKey: 'userteacherId' })
      
    }
  };
  Project.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    require: DataTypes.STRING,
    knowledgeSkills: DataTypes.STRING,
    instuctor: DataTypes.STRING,
    status: DataTypes.STRING,
    instuctor: DataTypes.STRING,
    userteacherId: DataTypes.STRING,
    reasonrefuse: DataTypes.STRING,
    nameprojectapprove: DataTypes.STRING,
    nameprojectrefuse: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};