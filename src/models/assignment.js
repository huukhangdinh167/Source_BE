'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Assignment.init({
    groupStudent: DataTypes.STRING,
    idUserStudent1: DataTypes.INTEGER,
    IdUserStudent2: DataTypes.INTEGER,
    idProject: DataTypes.INTEGER,
    projectNameFinall: DataTypes.STRING,
    idGVHD: DataTypes.INTEGER,
    idGVPB1: DataTypes.INTEGER,
    idGVPB2: DataTypes.INTEGER,
    idCTHD: DataTypes.INTEGER,
    idTK: DataTypes.INTEGER,
    idUV: DataTypes.INTEGER,
    idPoster1: DataTypes.INTEGER,
    idPoster2: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Assignment',
  });
  return Assignment;
};