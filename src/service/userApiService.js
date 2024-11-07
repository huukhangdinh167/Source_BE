import db from "../models/index";
import { hashUserPassword, checkMaSoExist, checkPhoneExist } from './loginRegisterService'

const getAllUser = async () => {
    try {
        let users = await db.Userstudent.findAll({
            attributes: ["id", "maSo", "email", "phoneNumber"],
            include: { model: db.Group, attributes: ["name", "description"] },
            raw: true,
            nest: true,

        });
        if (users) {

            return {
                EM: 'Get data successful',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'Get data successful',
                EC: 0,
                DT: []
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrongs with service',
            EC: 1,
            DT: []
        }
    }
}
const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Userstudent.findAndCountAll({
            attributes: ["id", "maSo", "email", "phoneNumber"],
            include: { model: db.Group, attributes: ["name", "description", "id"] },

            offset: offset,
            limit: limit,
            order: [['id', 'DESC']]
        })
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            EM: 'fetch ok',
            EC: 0,
            DT: data
        }

    } catch (e) {
        console.log(e);
        return {
            EM: 'some thing wrongs with serviecs',
            EC: 1,
            DT: []
        }
    }
}
const createNewUser = async (data) => {
    try {
        let isEmailExist = await checkMaSoExist(data.maSo);
        if (isEmailExist == true) {
            return {
                EM: 'MaSo already exist',
                EC: 1,
                DT: "maSo"
            }
        }

        // let isPhoneExist = await checkPhoneExist(data.phone);
        // if (isPhoneExist == true) {
        //     return {
        //         EM: 'Phone already existttt',
        //         EC: 1,
        //         DT: "phone"
        //     }
        // }

        let hashPassword = await hashUserPassword(data.password)

        let users = await db.Userstudent.create({ ...data, password: hashPassword });
        return {
            EM: 'Create  data successful',
            EC: 0,
            DT: users
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrongs with service',
            EC: 1,
            DT: []
        }
    }
}
const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: 'Error Empty width GroudId',
                EC: 1,
                DT: 'group'
            }
        }
        let users = await db.User.findOne({
            where: { id: data.id }
        });
        if (users) {
            await users.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })

            return {
                EM: 'Update user successful',
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: 'Get data successful',
                EC: 0,
                DT: []
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrongs with service',
            EC: 1,
            DT: []
        }
    }
}
const deleteUser = async (id) => {
    try {
        let users = await db.Userstudent.findOne({
            where: {
                id: id,
            },
        });
        if (users) {
            await users.destroy();
            return {
                EM: 'Delete User successful',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'User no exist',
                EC: 0,
                DT: []
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }
}
module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}