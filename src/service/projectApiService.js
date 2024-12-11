
import db from '../models/index'
import { Op } from 'sequelize';
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
            // attributes: ["id", "name", "description", "require", "knowledgeSkills", "instuctor", "status"],//lấy các cột mình quan tâm
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
        if (data.groupId == 5) {
            let project = await db.Project.create({ ...data, status: 1 });
            return {
                EM: 'create Ok',
                EC: 0,
                DT: project
            }
        } else {
            let project = await db.Project.create({ ...data });
            return {
                EM: 'create Ok',
                EC: 0,
                DT: project
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

const updateProject = async (data) => {
    try {

        let project2 = await db.Project.findOne({
            where: {
                id: data.id
            },
        })
        if (project2) {
            if (data.name.trim() == project2.nameprojectapprove) {
                await project2.update({
                    name: data.name.trim(),
                    description: data.description,
                    require: data.require,
                    knowledgeSkills: data.knowledgeSkills,
                    status: 1,

                })
                return {
                    EM: 'hhhh',
                    EC: 0,
                    DT: []
                }
            } else if (data.name.trim() == project2.nameprojectrefuse) {
                await project2.update({
                    name: data.name.trim(),
                    description: data.description,
                    require: data.require,
                    knowledgeSkills: data.knowledgeSkills,
                    status: 2,
                })
                return {
                    EM: 'hhhh',
                    EC: 0,
                    DT: []
                }
            } else {
                await project2.update({
                    name: data.name.trim(),
                    description: data.description,
                    require: data.require,
                    knowledgeSkills: data.knowledgeSkills,
                    status: 0,
                })
                return {
                    EM: 'Không khớp tên',
                    EC: 0,
                    DT: []
                }
            }
        } else {
            // await project2.update({
            //     name: data.name.trim(),
            //     description: data.description,
            //     require: data.require,
            //     knowledgeSkills: data.knowledgeSkills,
            //     status: 0,
            // })
            return {
                EM: 'Không tìm thấy project',
                EC: 1,
                DT: []
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