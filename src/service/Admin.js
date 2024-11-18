import db from "../models/index";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;

}
const adminGetAllUser = async () => {
    try {
        let users = await db.Userstudent.findAll({
            include: { model: db.Group, attributes: ["name", "description", 'id'] },
            raw: true,
            nest: true,
            order: [['maSo', 'ASC']]
        });
        let users2 = await db.Userteacher.findAll({
            include: { model: db.Group, attributes: ["name", "description", 'id'], },
            raw: true,
            nest: true,
            order: [['maSo', 'ASC']]
        });
        let combinedUser = [...users2, ...users];
        if (combinedUser) {
            return {
                EM: 'Get data successful',
                EC: 0,
                DT: combinedUser
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
        let currentUser2 = await db.Userteacher.findAll({

            raw: true // convert sequelize obj to javascrip obj
        })
        let persist = role.filter(({ maSo: id1 }) => !currentUser.some(({ maSo: id2 }) => id2 === id1));
        let persist2 = role.filter(({ maSo: id1 }) => !currentUser2.some(({ maSo: id2 }) => id2 === id1));
        if (persist.length === 0 || persist2.length === 0) {
            return {
                EM: 'All maSo already exist',
                EC: 1,
                DT: []
            };
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
const checkMaSoExist = async (maSo) => {
    let user = await db.Userteacher.findOne({
        where: {
            maSo: maSo,
        }
    })
    let user2 = await db.Userstudent.findOne({
        where: {
            maSo: maSo,
        }
    })

    if (user || user2 ) {
        return true;
    } return false;
    
}
const admincreateNewTeacher = async (data) => {
    try {
        let isMaSoExist = await checkMaSoExist(data.maSo);
        if (isMaSoExist == true) {
            return {
                EM: 'MaSo already exist',
                EC: 1,
                DT: "maSo"
            }
        }
        let hashPassword = hashUserPassword(data.password)

        let users = await db.Userteacher.create({ ...data, password: hashPassword });
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

const adminupdateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: 'Error Empty width GroudId',
                EC: 1,
                DT: 'group'
            }
        }
        if (+data.groupId === 1) {
            if (data.password === '') {
                await db.Userstudent.update({
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    groupId: data.groupId,
                    maSo: data.maSo,

                },
                    {
                        where: {
                            maSo: data.maSo,
                        },
                    }
                )
            } else {
                let hashPassword = hashUserPassword(data.password)
                await db.Userstudent.update({
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    groupId: data.groupId,
                    maSo: data.maSo,
                    password: hashPassword,
                },
                    {
                        where: {
                            maSo: data.maSo,
                        },
                    }
                )
            }
            return {
                EM: 'Update user successful',
                EC: 0,
                DT: ''
            }
        } else {
            if (data.password === '') {
                await db.Userteacher.update({
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    groupId: data.groupId,
                    maSo: data.maSo,

                },
                    {
                        where: {
                            maSo: data.maSo,
                        },
                    }
                )
            } else {
                let hashPassword = hashUserPassword(data.password)
                await db.Userteacher.update({
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    groupId: data.groupId,
                    maSo: data.maSo,
                    password: hashPassword,
                },
                    {
                        where: {
                            maSo: data.maSo,
                        },
                    }
                )
            }

            return {
                EM: 'Update user successful',
                EC: 0,
                DT: ''
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

const adminDeleteUser = async (data) => {
    try {
        let users = await db.Userstudent.findOne({
            where: {
                maSo: data.maSo,
            },
        });
        let users2 = await db.Userteacher.findOne({
            where: {
                maSo: data.maSo,
            },
        });
        if (users) {
            await users.destroy();
            return {
                EM: 'Delete User successful',
                EC: 0,
                DT: []
            }
        }
        if (users2) {
            await users2.destroy();
            return {
                EM: 'Delete User successful',
                EC: 0,
                DT: []
            }
        }
        return {
            EM: 'Not found user to delete',
            EC: 1,
            DT: []
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
    adminGetAllUser, adminGetUserWithPagination,
    admincreateNewUser, adminupdateUser, admincreateNewTeacher, adminDeleteUser
}