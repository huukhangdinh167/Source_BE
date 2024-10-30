import db from "../models"
require ('dotenv').config();
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import { Op } from 'sequelize';
import {getGroupWithRole} from './JWTService'
import {CreateJWT} from '../middleware/JWTAction'
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;

}
const checkEmailExist = async (UserEmail) => {
    let user = await db.User.findOne({
        where: {
            email: UserEmail,
        }
    })
    if (user) {
        return true;
    } return false;
}

const checkPhoneExist = async (UserPhone) => {
    let user = await db.User.findOne({
        where: {
            phone: UserPhone,
        }
    })
    if (user) {
        return true;
    } return false;
}


const registerNewUser = async (rawUserDate) => {
    // check email /phone are exist
    try {

        let isEmailExist = await checkEmailExist(rawUserDate.email)
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exist',
                EC: 1
            }
        }
        let isPhonelExist = await checkPhoneExist(rawUserDate.phone)
        if (isPhonelExist === true) {
            return {
                EM: 'The phone is already exist',
                EC: 1
            }
        }
        // hash password 
        let hashPassword = hashUserPassword(rawUserDate.password)
        // create new user 
        await db.User.create({
            username: rawUserDate.username,
            email: rawUserDate.email,
            password: hashPassword,
            phone: rawUserDate.phone,
            groupId: 1
        })

        return {
            EM: 'A user is creat successful...',
            EC: 0
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrongs in server...',
            EC: -2
        }
    }
}

const checkPassword =  (inputPassword, hashPassword) => {

    return bcrypt.compareSync(inputPassword, hashPassword);
}
const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },  // Điều kiện 1
                    { phone: rawData.valueLogin }   // Điều kiện 2
                ]
            }
        });

        if (user) {
            // console.log("Fond user with email/phone ")
            let isCorectPassword =   checkPassword(rawData.password, user.password);
            if (isCorectPassword === true) {
                
               let groupWithRole = await getGroupWithRole(user)
               let payload = {
                email: user.email,
                groupWithRole,
                expiresIn: process.env.JWT_Expires
            }
              let token = await CreateJWT(payload)
                return {
                    EM: 'OK!!!!',
                    EC: 0,
                    DT: {
                        accesstoken: token,
                        groupWithRole
                        
                    }
                }
            }
        }
        // console.log(">>Not found email/phone", rawData.valueLogin, "Password", rawData.password )
        return {
            EM: 'Your Email/Phone or password incorect',
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
    registerNewUser, handleUserLogin, hashUserPassword,checkEmailExist,checkPhoneExist
}