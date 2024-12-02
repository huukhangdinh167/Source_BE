'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Result.belongsTo(models.Userstudent, { foreignKey: 'userstudentId' })

    }
  };
  Result.init({
    userstudentId: DataTypes.STRING,
    danhgiagiuaky: DataTypes.STRING,
    danhgiacuoiky: DataTypes.STRING,
    diemGVHD: DataTypes.STRING,
    diemGVPB1: DataTypes.STRING,
    diemGVPB2: DataTypes.STRING,
    danhgiaphanbien: DataTypes.STRING,
    trungbinhphanbien: DataTypes.STRING,
    diemCTHD: DataTypes.STRING,
    diemTK: DataTypes.STRING,
    diemUV: DataTypes.STRING,
    diemPoster1: DataTypes.STRING,
    diemPoster2: DataTypes.STRING,
    danhgiahoidong: DataTypes.STRING,
    trungbinhhoidong: DataTypes.STRING,
   
  }, {
    sequelize,
    modelName: 'Result',
  });
  return Result;
};