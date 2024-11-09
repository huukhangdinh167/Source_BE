import db from "../models/index";
import { Op } from 'sequelize';
const getAllProject = async (maSo) => {
    try {
        let users = await db.Userstudent.findOne({
            where: {
                [Op.and]: [
                    { maSo: maSo },  // Điều kiện 1
                    { projectId: { [Op.ne]: 0 } } // Điều kiện 2
                ]
            },
            // raw: true,
            //  nest: true,
            // chưa đăng kì = 0 .....đã đăng kí thì khác 0
        });
        //nếu user === true thì đã đăng kí 
        if (users) {
            return {
                EM: 'Ban da dang ki',
                EC: 2,
                DT: ''
            }
        } else {
            let data = await db.Project.findAll({ order: [['id', 'ASC']] });
            return {
                EM: 'Get all project success',
                EC: 0,
                DT: data
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
const dangkiProject = async (id, projectId) => {
    try {
        let users = await db.Userstudent.findOne({
            where: { maSo: id }
        });
        if (users) {
            await users.update({
                projectId: projectId
            })

            return {
                EM: 'Đăng kí successful',
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: 'Khong tim thay ',
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

const huydangkiProject = async (id, projectId) => {
    try {
        let users = await db.Userstudent.findOne({
            where: {
                [Op.and]: [
                    { projectId: projectId },  // Điều kiện 1
                    { maSo: id } // Điều kiện 2
                ]
            },
            // raw: true,
            //  nest: true,
        });
        //    console.log(users)
        // return users
        if (users) {
            await users.update({
                projectId: "0"
            })

            return {
                EM: 'Hủy đăng kí  successful',
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: 'Khong tim thay ',
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


const getAllProjectRegister = async (id) => {
    try {
        let result = await db.Project.findOne({
            include: [
                {
                    model: db.Userstudent, // Bảng Project để join với bảng Student
                    where: {
                        maSo: id, // Điều kiện maSo bằng giá trị của id
                    }
                }
            ], raw: true,
            nest: true


        });
        return {
            EM: 'Get all project success',
            EC: 0,
            DT: result
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
const getAllUserRegisterProject = async (id) => {
    try {
        let result = await db.Userstudent.findAll({
            where: {
                projectId: id
            },
            order: [
                ['groupStudent'] // Sắp xếp theo groupId tăng dần
            ],
            raw: true,
            nest: true

        });
        return {
            EM: 'Get all project success',
            EC: 0,
            DT: result
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


const chooseGroup = async (orthesST, myST, groupST) => {
    try {
        let users1 = await db.Userstudent.findOne({
            where: { maSo: orthesST }
        });
        let users2 = await db.Userstudent.findOne({
            where: { maSo: myST }
        });
        if (users1 && users2) {
            await users1.update({
                groupStudent: groupST
            })
            await users2.update({
                groupStudent: groupST
            })


            return {
                EM: 'Đăng kí successful',
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: 'Khong tim thay ',
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
const cancelChooseGroup =async(groupSD)=>{
    try {
      let data =  await db.Userstudent.update(
            { groupStudent: 'null' },
            { where: { groupStudent:  groupSD} }
          )
          if(data){
            return {
                EM: 'Cancel choose group success ',
                EC: 0,
                DT: '',
            }
          }else{
            return {
                EM: 'Can not update ',
                EC: 1,
                DT: '',
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
module.exports = {
    getAllProject, dangkiProject, getAllProjectRegister, huydangkiProject, 
    getAllUserRegisterProject, chooseGroup,cancelChooseGroup
}