import db from "../models"
require('dotenv').config();
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import { Op } from 'sequelize';
import { getGroupWithRole } from './JWTService'
import { CreateJWT } from '../middleware/JWTAction'
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;

}
const checkMaSoExist = async (UserEmail) => {
    let user = await db.Userstudent.findOne({
        where: {
            maSo: UserEmail,
        }
    })
    if (user) {
        return true;
    } return false;
}
const checkPassword = (inputPassword, hashPassword) => {

    return bcrypt.compareSync(inputPassword, hashPassword);
}
const handleUserLogin = async (rawData) => {
    try {
        let user = await db.Userstudent.findOne({
            where: {
                [Op.or]: [
                    { maSo: rawData.valueLogin },  // Điều kiện 1

                ]
            }
        });

        if (user) {
            //   console.log("rawData.password, user.password: ",rawData.password, user.password)
          //  let isCorectPassword =   checkPassword(rawData.password, user.password);
          //  if (isCorectPassword === true) {

            let groupWithRole = await getGroupWithRole(user)
            let payload = {
                email: user.email,
                username: user.maSo,
                name: user.name,
                groupWithRole,

            }
            let token = await CreateJWT(payload)
            return {
                EM: 'OK!!!!',
                EC: 0,
                DT: {
                    accesstoken: token,
                    groupWithRole,
                    email: user.email,
                    username: user.maSo,
                    groupId : user.groupId,
                    name: user.name


                }
            }
          //  }
        }
        // console.log(">>Not found email/phone", rawData.valueLogin, "Password", rawData.password )
        return {
            EM: 'Your Student code/Password incorect',
            EC: 1,
            DT: user
        }


    } catch (e) {
        console.log("Lỗi e", e)
        return {
            EM: 'Some thing wrongs in server...',
            EC: -2
        }
    }

}
module.exports = {
    handleUserLogin, hashUserPassword,checkMaSoExist
}