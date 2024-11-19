
import db from '../models/index'

const getAllProject = async (userteacherId) => {
    try {
        if (!userteacherId) {
            return {
                EM: "Missing userteacherId",
                EC: 1,
                DT: []
            };
        }
        let projects = await db.Project.findAll({
            attributes: ["id", "name", "description", "require", "knowledgeSkills", "instuctor", "status"],//lấy các cột mình quan tâm
            // include: { model: db.Userteacher, attributes: ["maSo"] },//ket noi voi cot cua table khac
            // nest: true
            where: { userteacherId: userteacherId },

        });
        return {
            EM: 'GET DATA SUCCESS!',
            EC: 0,
            DT: projects
        }

    } catch (e) {
        console.log(e);
        return {
            EM: 'SOMETHING WRONG!',
            EC: 1,
            DT: []
        }
    }
}

const createNewProject = async (data) => {
    try {
        let project = await db.Project.create({ ...data });
        return {
            EM: 'create Ok',
            EC: 0,
            DT: project
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Error from service',
            EC: 1,
            DT: []
        }
    }
}

const updateProject = async (data) => {
    try {
        let project = await db.Project.findOne({
            where: { id: data.id }
        })
        if (project) {
            //update
            await project.update({
                name: data.name,
                description: data.description,
                require: data.require,
                knowledgeSkills: data.knowledgeSkills,


            })
            return {
                EM: 'Project Updated success ',
                EC: 0,
                DT: ''
            }
        } else {
            //not found
            return {
                EM: 'Project not found',
                EC: 2,
                DT: ''
            }
        }

    } catch (e) {
        console.log(e);
        return {
            EM: 'SOMETHING WRONG!',
            EC: 1,
            DT: []
        }
    }
}

const deleteProject = async (id) => {
    try {
        let project = await db.Project.findOne({
            where: { id: id }
        })

        if (project) {

            await project.destroy();

            return {
                EM: 'Success',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'User not exist',
                EC: 2,
                DT: data
            }
        }

    } catch (e) {
        console.log(e);
        return {
            EM: 'Error from service',
            EC: 1,
            DT: []
        }

    }
}


module.exports = {
    getAllProject, createNewProject, updateProject, deleteProject
}