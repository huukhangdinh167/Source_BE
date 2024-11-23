'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Criteriapb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Criteriapb.belongsTo(models.Userstudent, { foreignKey: 'userstudentId' })

    }
  };
  Criteriapb.init({
    userstudentId: DataTypes.STRING,
    LOL1: DataTypes.STRING,
    LOL2: DataTypes.STRING,
    LOL3: DataTypes.STRING,
    LOL4: DataTypes.STRING,
    LOL5: DataTypes.STRING,
    LOL6: DataTypes.STRING,
    LOL7: DataTypes.STRING,
    LOL8: DataTypes.STRING,
    ghichu: DataTypes.STRING,



  }, {
    sequelize,
    modelName: 'Criteriapb',
  },
    {
      timestamps: false, // Tắt tạo các cột createdAt và updatedAt
    });


  return Criteriapb;
};