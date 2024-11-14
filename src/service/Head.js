import db from "../models/index";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';


const headGetProjectAndUser = async () => {
    try {
        let users = await db.Project.findAll({
            where: {
                status: '1',
            },
            include: { model: db.Userstudent },
            order: [['id', 'ASC']]

        });
        if (users) {
            return {
                EM: 'Get all projectanduser success',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'Can not get all projectanduser success',
                EC: 2,
                DT: users
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
const headGetProjectApprove = async () => {
    try {
        let users = await db.Project.findAll({
            where: {
                status: '0',
            },
            order: [['id', 'ASC']]

        });
        if (users) {
            return {
                EM: 'Get Project Approve success',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'Can not Project Approve success',
                EC: 2,
                DT: users
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
const headDeleteProject = async (id) => {
    try {
        let users = await db.Project.destroy({
            where: {
                id: id,
            },
        });
        if (users) {
            return {
                EM: 'Delete project success',
                EC: 0,
                DT: id,
            }
        } else {
            return {
                EM: 'Can not Delete project success',
                EC: 2,
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

const headDeleteProjectRegisterUser = async (maSo, groupStudent) => {
    try {
        let data = await db.Userstudent.update(
            { projectId: 0 },
            { where: { maSo: maSo } }
        )

        let data2 = await db.Userstudent.update(
            { groupStudent: 'null' },
            { where: { groupStudent: groupStudent } }
        )
        if (data && data2) {
            return {
                EM: 'Delete Student Register Project success ',
                EC: 0,
                DT: '',
            }
        } else {
            return {
                EM: 'Can not Delete ',
                EC: 1,
                DT: '',
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

const headApproveProject =async(id)=>{
    try {
        let data = await db.Project.update(
            { status: 1 },
            { where: { id: id } }
        )
        if (data ) {
            return {
                EM: 'Approve Project success ',
                EC: 0,
                DT: '',
            }
        } else {
            return {
                EM: 'Can not Approve ',
                EC: 1,
                DT: '',
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
module.exports = { headGetProjectAndUser, headDeleteProject, headDeleteProjectRegisterUser, headGetProjectApprove, headApproveProject }