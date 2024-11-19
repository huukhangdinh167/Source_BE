import db from "../models/index"
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
                maSo: rawData.valueLogin,  // Điều kiện 1
            }
        });
        let user2 = await db.Userteacher.findOne({
            where: {
                maSo: rawData.valueLogin   // Điều kiện 1
            }
        });
        if (user2) {
            //   console.log("rawData.password, user.password: ",rawData.password, user.password)
            let isCorectPassword = checkPassword(rawData.password, user2.password);
            if (isCorectPassword === true) {

                let groupWithRole = await getGroupWithRole(user2)
                let payload = {
                    email: user2.email,
                    username: user2.maSo,
                    name: user2.name,
                    phoneNumber: user2.phoneNumber,
                    groupWithRole,

                }
                let token = await CreateJWT(payload)
                return {
                    EM: 'OK!!!!',
                    EC: 0,
                    DT: {
                        accesstoken: token,
                        groupWithRole,
                        email: user2.email,
                        username: user2.maSo,
                        groupId: user2.groupId,
                        name: user2.name,
                        phoneNumber: user2.phoneNumber
                    }
                }
            }
        }

        if (user) {
            //   console.log("rawData.password, user.password: ",rawData.password, user.password)
            let isCorectPassword = checkPassword(rawData.password, user.password);
            if (isCorectPassword === true) {

                let groupWithRole = await getGroupWithRole(user)
                let payload = {
                    email: user.email,
                    username: user.maSo,
                    name: user.name,
                    phoneNumber: user.phoneNumber,
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
                        groupId: user.groupId,
                        name: user.name,
                        phoneNumber: user.phoneNumber


                    }
                }
            }
        }
        return {
            EM: 'Your Student code/Password incorect',
            EC: 1,
            DT: ''
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
    handleUserLogin, hashUserPassword, checkMaSoExist
}