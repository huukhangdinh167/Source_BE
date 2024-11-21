import db from "../models/index";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import { where } from "sequelize/lib/sequelize";


const GetLichPB = async (maSo) => {
    try {
        let user2 = await db.Userteacher.findOne({
            where: {
                maSo: maSo,
            }
        });
        // let users = await db.Project.findAll({
        //     where: {
        //         status: 1,
        //     },
        //     include: {
        //         model: db.Userstudent,
        //         where: {
        //             [Op.or]: [{ pb1: user2.id }, { pb2: user2.id }],
        //         },
        //     },
        //     order: [['id', 'ASC']]
        // }); 

        let users = await db.Userstudent.findAll({
            where: {
                [Op.or]: [{ pb1: user2.id }, { pb2: user2.id }],
            },
            include: { model: db.Project, where: { status: 1 }, },
            order: [
                ['projectId', 'ASC'], // Sắp xếp theo projectId tăng dần
                ['groupStudent', 'ASC'] // Sau đó sắp xếp theo groupStudent tăng dần
            ]
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

const GetDSHD = async (maSo) => {
    try {
        let users = await db.Userstudent.findAll({
            include: [
                {
                    model: db.Project,
                    where: {
                        userteacherId: maSo // Điều kiện maSoGV của bảng Project
                    }
                },
                {
                    model: db.Result,
                    // Nếu muốn lấy cả userStudent không có result
                },
                {
                    model: db.Criteria,
                    // Nếu muốn lấy cả userStudent không có criteria
                }
            ]
        });

        return {
            EM: 'Some thing wrongs with service',
            EC: 1,
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
module.exports = {
    GetLichPB, GetDSHD
}