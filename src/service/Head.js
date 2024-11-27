import db from "../models/index";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import { where } from "sequelize/lib/sequelize";


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
        let users2 = await db.Userstudent.update(
            {
                pb1: '',
                pb2: '',
                projectId: 0
            },
            {
                where: { projectId: id }
            }

        )
        if (users && users2) {
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

const headApproveProject = async (id, name) => {
    try {
        let data = await db.Project.update(
            {
                status: 1,
                nameprojectapprove: name.trim()
            },
            { where: { id: id } }
        )
        if (data) {
            return {
                EM: 'Đã duyệt đề tài ',
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
const headRefuseProject = async (id, name, reasonrefuse) => {
    try {
        let data = await db.Project.update(
            {
                status: 2,
                reasonrefuse: reasonrefuse,
                nameprojectrefuse: name.trim(),

            },
            { where: { id: id } }
        )
        if (data) {
            return {
                EM: 'Đã từ chối đề tài ',
                EC: 0,
                DT: '',
            }
        } else {
            return {
                EM: 'Can not Refuse ',
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

const headGetListTeacher = async () => {
    try {
        let data = await db.Userteacher.findAll({
            where: {
                groupId: {
                    [Op.ne]: 3
                }
            },
            order: [['name', 'ASC']]
        });
        return {
            EM: 'Get group success',
            EC: 0,
            DT: data
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

const headtest = async () => {
    try {
        let data = await db.Userstudent.findAll({
            where: { projectId: { [Op.ne]: 0 } },

            include: [{ model: db.Project },
            {
                model: db.Result, where: {
                    [Op.and]: [
                        { danhgiagiuaky: 'true' },  // Điều kiện 1
                        { danhgiacuoiky: 'true' } // Điều kiện 2
                    ]
                },
            }],
            order: [
                ['projectId', 'ASC'],
                // Sắp xếp theo projectId tăng dần
                ['groupStudent', 'ASC'],
                ['id', 'ASC'] // Sau đó sắp xếp theo groupStudent tăng dần
            ]
        });
        return {
            EM: 'Get group success',
            EC: 0,
            DT: data
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

const headgetDSHoiDong = async () => {
    try {
        let data = await db.Userstudent.findAll({
            where: { projectId: { [Op.ne]: 0 } },

            include: [{ model: db.Project },
            {
                model: db.Result, where: {
                    [Op.and]: [
                        { danhgiagiuaky: 'true' },  // Điều kiện 1
                        { danhgiacuoiky: 'true' },
                        // { trungbinhphanbien:  { [Op.ne]: null } } // Điều kiện 2
                    ]
                },
            }],
            order: [
                ['projectId', 'ASC'],
                // Sắp xếp theo projectId tăng dần
                ['groupStudent', 'ASC'],
                ['id', 'ASC'] // Sau đó sắp xếp theo groupStudent tăng dần
            ]
        });
        return {
            EM: 'Get group success',
            EC: 0,
            DT: data
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

const headAssignPB = async (data) => {
    try {
        if (data.groupStudent === 'null') {
            ////lllllll
            await db.Userstudent.update({
                pb1: data.pb1,
                pb2: data.pb2,
            }, {
                where: {
                    id: data.id
                },
            })
            return {
                EM: 'Assign success',
                EC: 0,
                DT: '',
            }

        } else {
            await db.Userstudent.update({
                pb1: data.pb1,
                pb2: data.pb2,
            }, {
                where: {
                    groupStudent: data.groupStudent
                },
            })
            return {
                EM: 'Assign success',
                EC: 0,
                DT: '',
            }
        }
    }
    catch (e) {
        console.log(e)
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }
} 

const headPhanCongHoiDong = async (data) => {
    try {
        if (data.groupStudent === 'null') {
            ////lllllll
            await db.Userstudent.update({
                CTHD: data.CTHD,
                TK: data.TK,
                UV: data.UV,
               

            }, {
                where: {
                    id: data.id
                },
            })
            return {
                EM: 'Assign success',
                EC: 0,
                DT: '',
            }

        } else {
            await db.Userstudent.update({
                CTHD: data.CTHD,
                TK: data.TK,
                UV: data.UV,
                
            }, {
                where: {
                    groupStudent: data.groupStudent
                },
            })
            return {
                EM: 'Assign success',
                EC: 0,
                DT: '',
            }
        }
    }
    catch (e) {
        console.log(e)
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }
} 

const headPhanCongPoster = async (data) => {
    try {
        if (data.groupStudent === 'null') {
            ////lllllll
            await db.Userstudent.update({
               
                Poster1: data.Poster1,
                Poster2: data.Poster2,

            }, {
                where: {
                    id: data.id
                },
            })
            return {
                EM: 'Assign success',
                EC: 0,
                DT: '',
            }

        } else {
            await db.Userstudent.update({
                
                Poster1: data.Poster1,
                Poster2: data.Poster2,
            }, {
                where: {
                    groupStudent: data.groupStudent
                },
            })
            return {
                EM: 'Assign success',
                EC: 0,
                DT: '',
            }
        }
    }
    catch (e) {
        console.log(e)
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }
}
module.exports = {
    headGetProjectAndUser, headDeleteProject, headDeleteProjectRegisterUser,
    headGetProjectApprove, headApproveProject, headGetListTeacher, headtest, headAssignPB,
    headRefuseProject,headgetDSHoiDong,headPhanCongHoiDong,headPhanCongPoster
}