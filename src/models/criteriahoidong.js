'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Criteriahoidong extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Criteriahoidong.belongsTo(models.Userstudent, { foreignKey: 'userstudentId' })

        }
    };
    Criteriahoidong.init({
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

        LOL1TK: DataTypes.STRING,
        LOL2TK: DataTypes.STRING,
        LOL3TK: DataTypes.STRING,
        LOL4TK: DataTypes.STRING,
        LOL5TK: DataTypes.STRING,
        LOL6TK: DataTypes.STRING,
        LOL7TK: DataTypes.STRING,
        LOL8TK: DataTypes.STRING,
        ghichuTK: DataTypes.STRING,

        LOL1UV: DataTypes.STRING,
        LOL2UV: DataTypes.STRING,
        LOL3UV: DataTypes.STRING,
        LOL4UV: DataTypes.STRING,
        LOL5UV: DataTypes.STRING,
        LOL6UV: DataTypes.STRING,
        LOL7UV: DataTypes.STRING,
        LOL8UV: DataTypes.STRING,
        ghichuUV: DataTypes.STRING,

        LOL1Poster1: DataTypes.STRING,
        LOL2Poster1: DataTypes.STRING,
        LOL3Poster1: DataTypes.STRING,
        LOL4Poster1: DataTypes.STRING,
        LOL5Poster1: DataTypes.STRING,
        LOL6Poster1: DataTypes.STRING,
        LOL7Poster1: DataTypes.STRING,
        LOL8Poster1: DataTypes.STRING,
        ghichuPoster1: DataTypes.STRING,

        LOL1Poster2: DataTypes.STRING,
        LOL2Poster2: DataTypes.STRING,
        LOL3Poster2: DataTypes.STRING,
        LOL4Poster2: DataTypes.STRING,
        LOL5Poster2: DataTypes.STRING,
        LOL6Poster2: DataTypes.STRING,
        LOL7Poster2: DataTypes.STRING,
        LOL8Poster2: DataTypes.STRING,
        ghichuPoster2: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Criteriahoidong',
    },
        {
            timestamps: false, // Tắt tạo các cột createdAt và updatedAt
        });


    return Criteriahoidong;
};