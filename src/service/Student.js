import db from "../models/index";

const getAllProject = async () => {
    try {
        let data = await db.Project.findAll({ order: [['id', 'ASC']] });
        return {
            EM: 'Get all project success',
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



module.exports = {
    getAllProject
}