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

const GetDGHD = async (data) => {
    try {
        let users = await db.Result.findOne({
            where: { userstudentId: data.id }
        });
        let users2 = await db.Criteria.findOne({
            where: { userstudentId: data.id }
        });
        if (users && users2) {
            // Cập nhật trong bảng results 
            if (data.danhgiacuoiky == 'true') {
                await db.Result.update({
                    danhgiagiuaky: data.danhgiagiuaky,
                    danhgiacuoiky: data.danhgiacuoiky,
                    diemGVHD: data.diemGVHD
                },
                    {
                        where: {
                            userstudentId: data.id
                        },
                    }
                )
                await db.Criteria.update({
                    LOL1: data.LOL1,
                    LOL2: data.LOL2,
                    LOL3: data.LOL3,
                    LOL4: data.LOL4,
                    LOL5: data.LOL5,
                    LOL6: data.LOL6,
                    LOL7: data.LOL7,
                    LOL8: data.LOL8,
                    ghichu: data.ghichu,

                },
                    {
                        where: {
                            userstudentId: data.id
                        },
                    }
                )
                return {
                    EM: 'DanhGiaGK thanh cong',
                    EC: 0,
                    DT: '',
                }
            } else if (data.danhgiacuoiky == 'false') {
                await db.Result.update({
                    danhgiagiuaky: data.danhgiagiuaky,
                    danhgiacuoiky: data.danhgiacuoiky,

                },
                    {
                        where: {
                            userstudentId: data.id
                        },
                    }
                )
                return {
                    EM: 'DanhGiaGK thanh cong',
                    EC: 0,
                    DT: '',
                }
            } else {
                await db.Result.update({
                    danhgiagiuaky: data.danhgiagiuaky,
                },
                    {
                        where: {
                            userstudentId: data.id
                        },
                    }
                )
                return {
                    EM: 'DanhGiaGK thanh cong',
                    EC: 0,
                    DT: '',
                }
            }

            // cập nhật trong bảng Criteria 
        } else {
            if (data.danhgiacuoiky == 'true') {
                await db.Result.create({
                    userstudentId: data.id,
                    danhgiagiuaky: data.danhgiagiuaky,
                    danhgiacuoiky: data.danhgiacuoiky,
                    diemGVHD: data.diemGVHD
                })
                await db.Criteria.create({
                    userstudentId: data.id,
                    LOL1: data.LOL1,
                    LOL2: data.LOL2,
                    LOL3: data.LOL3,
                    LOL4: data.LOL4,
                    LOL5: data.LOL5,
                    LOL6: data.LOL6,
                    LOL7: data.LOL7,
                    LOL8: data.LOL8,
                    ghichu: data.ghichu,
                })
                return {
                    EM: 'DanhGiaGK thanh cong',
                    EC: 0,
                    DT: '',
                }
            } else if (data.danhgiacuoiky == 'false') {
                await db.Result.create({
                    userstudentId: data.id,
                    danhgiagiuaky: data.danhgiagiuaky,
                    danhgiacuoiky: data.danhgiacuoiky,
                })
                await db.Criteria.create({
                    userstudentId: data.id,

                })
                return {
                    EM: 'DanhGiaCK thanh cong',
                    EC: 0,
                    DT: '',
                }
            } else {
                await db.Result.create({
                    userstudentId: data.id,
                    danhgiagiuaky: data.danhgiagiuaky,
                    
                })
                await db.Criteria.create({
                    userstudentId: data.id,

                })
                return {
                    EM: 'DanhGiaCK thanh cong',
                    EC: 0,
                    DT: '',
                }
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
    GetLichPB, GetDSHD, GetDGHD

}