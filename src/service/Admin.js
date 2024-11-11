import db from "../models/index";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const adminGetAllUser = async () => {
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
const adminGetUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Userstudent.findAndCountAll({

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

const admincreateNewUser = async (role) => {
    try {

        let currentUser = await db.Userstudent.findAll({
           
            raw: true // convert sequelize obj to javascrip obj
        })
        let persist = role.filter(({ maSo: id1 }) => !currentUser.some(({ maSo: id2 }) => id2 === id1));
        if (persist.length === 0) {
            return {
                EM: 'maSo already exist',
                EC: 1,
                DT: []
            }
        }
        await db.Userstudent.bulkCreate(persist)
        return {
            EM: `Add User Student(${persist.length}) success`,
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Some thing wrongs with serviceee',
            EC: 1,
            DT: []
        }

    }
}
module.exports = { adminGetAllUser, adminGetUserWithPagination, admincreateNewUser }