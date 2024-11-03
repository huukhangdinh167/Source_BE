import db from "../models/index";
const createNewRole = async (role) => {
    try {

        let currentRole = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true // convert sequelize obj to javascrip obj
        })

        let persist = role.filter(({ url: id1 }) => !currentRole.some(({ url: id2 }) => id2 === id1));
        if (persist.length === 0) {
            return {
                EM: 'Role already exist',
                EC: 1,
                DT: []
            }
        }
        await db.Role.bulkCreate(persist)
        return {
            EM: `Add role(${persist.length}) success`,
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
const getAllRole = async () => {
    try {
        let data = await db.Role.findAll();
        return {
            EM: 'Get all role success',
            EC: 0,
            DT: data
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

const deleteRole = async (id) => {
    try {
        let users = await db.Role.findOne({
            where: {
                id: id,
            },
        });
        
        if (users) {
            await users.destroy();
            return {
                EM: 'Delete Role successful',
                EC: 0,
                DT: ''
            }
        } 
    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrongs with service',
            EC: 1,
            DT: ''
        }
    }
}
module.exports = {
    createNewRole, getAllRole, deleteRole
}