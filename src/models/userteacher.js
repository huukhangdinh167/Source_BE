'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userteacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Userteacher.init({
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    maSo: DataTypes.STRING,
    password: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    
    
  }, {
    sequelize,
    modelName: 'Userteacher',
  });
  return Userteacher;
};