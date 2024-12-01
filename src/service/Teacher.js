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
        let users = await db.Userstudent.findAll({
            where: {
                [Op.or]: [{ pb1: user2.id }, { pb2: user2.id }],
            },
            include: [{ model: db.Project, where: { status: 1 } },
            { model: db.Result }, { model: db.Criteriapb }
            ],
            order: [
                ['projectId', 'ASC'], // Sắp xếp theo projectId tăng dần
                ['groupStudent', 'ASC'],
                ['id', 'ASC'] // Sau đó sắp xếp theo groupStudent tăng dần
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

const GetLichHoiDong = async (maSo) => {
    try {
        let user2 = await db.Userteacher.findOne({
            where: {
                maSo: maSo,
            }
        });
        let users = await db.Userstudent.findAll({
            where: {
                [Op.or]: [{ CTHD: user2.id }, { TK: user2.id }, { UV: user2.id }],
            },
            include: [{ model: db.Project, where: { status: 1 } },
            { model: db.Result }, { model: db.Criteriapb },  { model: db.Criteriahoidong }
            ],
            order: [
                ['projectId', 'ASC'], // Sắp xếp theo projectId tăng dần
                ['groupStudent', 'ASC'],
                ['id', 'ASC'] // Sau đó sắp xếp theo groupStudent tăng dần
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

const GetLichPoster = async (maSo) => {
    try {
        let user2 = await db.Userteacher.findOne({
            where: {
                maSo: maSo,
            }
        });
        let users = await db.Userstudent.findAll({
            where: {
                [Op.or]: [{ Poster1: user2.id }, { Poster2: user2.id }],
            },
            include: [{ model: db.Project, where: { status: 1 } },
            { model: db.Result },{ model: db.Criteriahoidong }
            ],
            order: [
                ['projectId', 'ASC'], // Sắp xếp theo projectId tăng dần
                ['groupStudent', 'ASC'],
                ['id', 'ASC'] // Sau đó sắp xếp theo groupStudent tăng dần
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
            ],
            order: [
                ['projectId', 'ASC'], // Sắp xếp theo projectId tăng dần
                ['groupStudent', 'ASC'],
                ['id', 'ASC'] // Sau đó sắp xếp theo groupStudent tăng dần
            ]
        });

        return {
            EM: 'get data success',
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
                    diemGVHD: 0,

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
                if(data.danhgiagiuaky == 'false'){
                    await db.Result.update({
                        danhgiagiuaky: data.danhgiagiuaky,
                        danhgiacuoiky: 'false',
                        diemGVHD: '0',
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
                }else{
                    await db.Result.update({
                        danhgiagiuaky: data.danhgiagiuaky,
                    },
                        {
                            where: {
                                userstudentId: data.id
                            },
                        }
                    )
                }
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
                    diemGVHD: '0'
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
                if(data.danhgiagiuaky == 'false'){
                    await db.Result.create({
                        userstudentId: data.id,
                        danhgiagiuaky: data.danhgiagiuaky,
                        danhgiacuoiky: 'false',
                        diemGVHD: 0,
                    })
                    await db.Criteria.create({
                        userstudentId: data.id,
                    })
                    return {
                        EM: 'DanhGiaCK thanh cong',
                        EC: 0,
                        DT: '',
                    }
                }else{
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

const GetSV1SV2 = async (data) => {
    try {
        if (data.groupStudent != 'null') {
            let users = await db.Userstudent.findAll({
                where: { groupStudent: data.groupStudent }
            });
            return {
                EM: '',
                EC: 0,
                DT: users
            }
        } else if (data.groupStudent == 'null') {
            let users2 = await db.Userstudent.findAll({
                where: { id: data.id }
            });
            return {
                EM: '',
                EC: 0,
                DT: users2
            }
        } else {
            return {
                EM: '',
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

const chamPhanBien = async (data) => {
    try {
        if (data.idSV2.id2 == 'null') {
            // chỉ có 1 thằng sinh viên -> tạo 1 lần
            let users2 = await db.Criteriapb.findOne({
                where: { userstudentId: data.idSV1.id1 }
            });
            let findPB1orPb2 = await db.Userteacher.findOne({
                where: { maSo: data.maSoGV.maSoGV }
            });
            // tính điểm trung binh phan bien cho sinh viên đầu tiên
            let findTBPhanBien = await db.Result.findOne({
                where: { userstudentId: data.idSV1.id1 }
            });
            let finddiemGVPB1 = findTBPhanBien.diemGVPB1
            let finddiemGVPB2 = findTBPhanBien.diemGVPB2
            let trungbinhphanbien1 = finddiemGVPB2
                ? (parseFloat(data.dataSV1.diem) + parseFloat(finddiemGVPB2)) / 2
                : null;
            let trungbinhphanbien2 = finddiemGVPB1
                ? (parseFloat(data.dataSV1.diem) + parseFloat(finddiemGVPB1)) / 2
                : null;


            if (users2) {
                // đã tồn tại trong db rồi nên chỉ cần update
                if (findPB1orPb2.id == data.pb1.pb1) {

                    await db.Result.update({
                        diemGVPB1: data.dataSV1.diem,
                        trungbinhphanbien: trungbinhphanbien1
                    }, { where: { userstudentId: data.idSV1.id1 }, })

                    await db.Criteriapb.update({
                        LOL1: data.dataSV1.LOL1,
                        LOL2: data.dataSV1.LOL2,
                        LOL3: data.dataSV1.LOL3,
                        LOL4: data.dataSV1.LOL4,
                        LOL5: data.dataSV1.LOL5,
                        LOL6: data.dataSV1.LOL6,
                        LOL7: data.dataSV1.LOL7,
                        LOL8: data.dataSV1.LOL8,
                        ghichu: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV1.id1 }, })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                } else if (findPB1orPb2.id == data.pb2.pb2) {
                    await db.Result.update({
                        diemGVPB2: data.dataSV1.diem,
                        trungbinhphanbien: trungbinhphanbien2
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    await db.Criteriapb.update({
                        LOL1PB2: data.dataSV1.LOL1,
                        LOL2PB2: data.dataSV1.LOL2,
                        LOL3PB2: data.dataSV1.LOL3,
                        LOL4PB2: data.dataSV1.LOL4,
                        LOL5PB2: data.dataSV1.LOL5,
                        LOL6PB2: data.dataSV1.LOL6,
                        LOL7PB2: data.dataSV1.LOL7,
                        LOL8PB2: data.dataSV1.LOL8,
                        ghichuPB2: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV1.id1 }, })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                } else {
                    return {
                        EM: 'Không thể xác định gv phản 1 hay 2',
                        EC: 1,
                        DT: []
                    }
                }

            } else {
                if (findPB1orPb2.id == data.pb1.pb1) {
                    await db.Result.update({
                        diemGVPB1: data.dataSV1.diem,
                        trungbinhphanbien: trungbinhphanbien1
                    }, { where: { userstudentId: data.idSV1.id1 }, })

                    await db.Criteriapb.create({
                        userstudentId: data.idSV1.id1,
                        LOL1: data.dataSV1.LOL1,
                        LOL2: data.dataSV1.LOL2,
                        LOL3: data.dataSV1.LOL3,
                        LOL4: data.dataSV1.LOL4,
                        LOL5: data.dataSV1.LOL5,
                        LOL6: data.dataSV1.LOL6,
                        LOL7: data.dataSV1.LOL7,
                        LOL8: data.dataSV1.LOL8,
                        ghichu: data.dataSV1.ghichu,
                    })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                } else if (findPB1orPb2.id == data.pb2.pb2) {
                    await db.Result.update({
                        diemGVPB2: data.dataSV1.diem,
                        trungbinhphanbien: trungbinhphanbien2
                    }, { where: { userstudentId: data.idSV1.id1 }, })

                    await db.Criteriapb.create({
                        userstudentId: data.idSV1.id1,
                        LOL1PB2: data.dataSV1.LOL1,
                        LOL2PB2: data.dataSV1.LOL2,
                        LOL3PB2: data.dataSV1.LOL3,
                        LOL4PB2: data.dataSV1.LOL4,
                        LOL5PB2: data.dataSV1.LOL5,
                        LOL6PB2: data.dataSV1.LOL6,
                        LOL7PB2: data.dataSV1.LOL7,
                        LOL8PB2: data.dataSV1.LOL8,
                        ghichuPB2: data.dataSV1.ghichu,
                    })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                } else {
                    return {
                        EM: 'Không thể xác định gv phản 1 hay 2',
                        EC: 1,
                        DT: []
                    }
                }
            }
        } else {

            // Có 2 đứa... tạo 2 lần 
            let users2 = await db.Criteriapb.findOne({
                where: { userstudentId: data.idSV1.id1 }
            });
            let users1 = await db.Criteriapb.findOne({
                where: { userstudentId: data.idSV2.id2 }
            });
            let findPB1orPb2 = await db.Userteacher.findOne({
                where: { maSo: data.maSoGV.maSoGV }
            });

            let findTBPhanBien = await db.Result.findOne({
                where: { userstudentId: data.idSV1.id1 }
            });
            let finddiemGVPB1 = findTBPhanBien.diemGVPB1
            let finddiemGVPB2 = findTBPhanBien.diemGVPB2
            let trungbinhphanbien1 = finddiemGVPB2
                ? (parseFloat(data.dataSV1.diem) + parseFloat(finddiemGVPB2)) / 2
                : null;
            let trungbinhphanbien2 = finddiemGVPB1
                ? (parseFloat(data.dataSV1.diem) + parseFloat(finddiemGVPB1)) / 2
                : null;

            //tính điểm trung binh phan bien cho sinh vien thứ 2 
            let SV2findTBPhanBien = await db.Result.findOne({
                where: { userstudentId: data.idSV2.id2 }
            });
            let SV2finddiemGVPB1 = SV2findTBPhanBien.diemGVPB1
            let SV2finddiemGVPB2 = SV2findTBPhanBien.diemGVPB2
            let SV2trungbinhphanbien1 = SV2finddiemGVPB2
                ? (parseFloat(data.dataSV2.diem) + parseFloat(SV2finddiemGVPB2)) / 2
                : null;
            let SV2trungbinhphanbien2 = SV2finddiemGVPB1
                ? (parseFloat(data.dataSV2.diem) + parseFloat(SV2finddiemGVPB1)) / 2
                : null;


            if (users2 && users1) {
                // tìm thấy 2 đứa-> chỉ cần update 
                if (findPB1orPb2.id == data.pb1.pb1) {
                    // lần đầu cho đứa thứ 1
                    await db.Result.update({
                        diemGVPB1: data.dataSV1.diem,
                        trungbinhphanbien: trungbinhphanbien1
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    // lần 2 cho đứa thứ 2
                    await db.Result.update({
                        diemGVPB1: data.dataSV2.diem,
                        trungbinhphanbien: SV2trungbinhphanbien1
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    //update lần 1 cho sv1
                    await db.Criteriapb.update({
                        LOL1: data.dataSV1.LOL1,
                        LOL2: data.dataSV1.LOL2,
                        LOL3: data.dataSV1.LOL3,
                        LOL4: data.dataSV1.LOL4,
                        LOL5: data.dataSV1.LOL5,
                        LOL6: data.dataSV1.LOL6,
                        LOL7: data.dataSV1.LOL7,
                        LOL8: data.dataSV1.LOL8,
                        ghichu: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    //update lần 2 cho sv2
                    await db.Criteriapb.update({
                        LOL1: data.dataSV2.LOL1,
                        LOL2: data.dataSV2.LOL2,
                        LOL3: data.dataSV2.LOL3,
                        LOL4: data.dataSV2.LOL4,
                        LOL5: data.dataSV2.LOL5,
                        LOL6: data.dataSV2.LOL6,
                        LOL7: data.dataSV2.LOL7,
                        LOL8: data.dataSV2.LOL8,
                        ghichu: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV2.id2 }, })


                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }

                } else if (findPB1orPb2.id == data.pb2.pb2) {
                    // lần đầu cho đứa thứ 1
                    await db.Result.update({
                        diemGVPB2: data.dataSV1.diem,
                        trungbinhphanbien: trungbinhphanbien2
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    // lần 2 cho đứa thứ 2
                    await db.Result.update({
                        diemGVPB2: data.dataSV2.diem,
                        trungbinhphanbien: SV2trungbinhphanbien2
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    //update lần 1 cho sv1
                    await db.Criteriapb.update({
                        LOL1PB2: data.dataSV1.LOL1,
                        LOL2PB2: data.dataSV1.LOL2,
                        LOL3PB2: data.dataSV1.LOL3,
                        LOL4PB2: data.dataSV1.LOL4,
                        LOL5PB2: data.dataSV1.LOL5,
                        LOL6PB2: data.dataSV1.LOL6,
                        LOL7PB2: data.dataSV1.LOL7,
                        LOL8PB2: data.dataSV1.LOL8,
                        ghichuPB2: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    //update lần 2 cho sv2
                    await db.Criteriapb.update({
                        LOL1PB2: data.dataSV2.LOL1,
                        LOL2PB2: data.dataSV2.LOL2,
                        LOL3PB2: data.dataSV2.LOL3,
                        LOL4PB2: data.dataSV2.LOL4,
                        LOL5PB2: data.dataSV2.LOL5,
                        LOL6PB2: data.dataSV2.LOL6,
                        LOL7PB2: data.dataSV2.LOL7,
                        LOL8PB2: data.dataSV2.LOL8,
                        ghichuPB2: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                } else {
                    return {
                        EM: 'Không thể xác định gv phản 1 hay 2',
                        EC: 1,
                        DT: []
                    }
                }

            } else {
                //không tìm thấy 2 đứa trong bản Criteriapb 
                // tìm thấy 2 đứa-> thì create bảng Criteriapb và update bảng result
                if (findPB1orPb2.id == data.pb1.pb1) {
                    // lần đầu cho đứa thứ 1
                    await db.Result.update({
                        diemGVPB1: data.dataSV1.diem,
                        trungbinhphanbien: trungbinhphanbien1
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    // lần 2 cho đứa thứ 2
                    await db.Result.update({
                        diemGVPB1: data.dataSV2.diem,
                        trungbinhphanbien: SV2trungbinhphanbien1
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    // làm cho đứa thứ 1
                    await db.Criteriapb.create({
                        userstudentId: data.idSV1.id1,
                        LOL1: data.dataSV1.LOL1,
                        LOL2: data.dataSV1.LOL2,
                        LOL3: data.dataSV1.LOL3,
                        LOL4: data.dataSV1.LOL4,
                        LOL5: data.dataSV1.LOL5,
                        LOL6: data.dataSV1.LOL6,
                        LOL7: data.dataSV1.LOL7,
                        LOL8: data.dataSV1.LOL8,
                        ghichu: data.dataSV1.ghichu,
                    })

                    // làm cho đứa thứ 2 
                    await db.Criteriapb.create({
                        userstudentId: data.idSV2.id2,
                        LOL1: data.dataSV2.LOL1,
                        LOL2: data.dataSV2.LOL2,
                        LOL3: data.dataSV2.LOL3,
                        LOL4: data.dataSV2.LOL4,
                        LOL5: data.dataSV2.LOL5,
                        LOL6: data.dataSV2.LOL6,
                        LOL7: data.dataSV2.LOL7,
                        LOL8: data.dataSV2.LOL8,
                        ghichu: data.dataSV1.ghichu,
                    })
                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }

                } else if (findPB1orPb2.id == data.pb2.pb2) {
                    // lần đầu cho đứa thứ 1
                    await db.Result.update({
                        diemGVPB2: data.dataSV1.diem,
                        trungbinhphanbien: trungbinhphanbien2
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    // lần 2 cho đứa thứ 2
                    await db.Result.update({
                        diemGVPB2: data.dataSV2.diem,
                        trungbinhphanbien: SV2trungbinhphanbien2
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    // làm cho đứa thứ 1
                    await db.Criteriapb.create({
                        userstudentId: data.idSV1.id1,
                        LOL1PB2: data.dataSV1.LOL1,
                        LOL2PB2: data.dataSV1.LOL2,
                        LOL3PB2: data.dataSV1.LOL3,
                        LOL4PB2: data.dataSV1.LOL4,
                        LOL5PB2: data.dataSV1.LOL5,
                        LOL6PB2: data.dataSV1.LOL6,
                        LOL7PB2: data.dataSV1.LOL7,
                        LOL8PB2: data.dataSV1.LOL8,
                        ghichuPB2: data.dataSV1.ghichu,
                    })

                    // làm cho đứa thứ 2 
                    await db.Criteriapb.create({
                        userstudentId: data.idSV2.id2,
                        LOL1PB2: data.dataSV2.LOL1,
                        LOL2PB2: data.dataSV2.LOL2,
                        LOL3PB2: data.dataSV2.LOL3,
                        LOL4PB2: data.dataSV2.LOL4,
                        LOL5PB2: data.dataSV2.LOL5,
                        LOL6PB2: data.dataSV2.LOL6,
                        LOL7PB2: data.dataSV2.LOL7,
                        LOL8PB2: data.dataSV2.LOL8,
                        ghichuPB2: data.dataSV1.ghichu,
                    })
                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }

                } else {
                    return {
                        EM: 'Không thể xác định gv phản 1 hay 2',
                        EC: 1,
                        DT: []
                    }
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

const ChamHoiDong = async (data) => {
    try {
        if (data.idSV2.id2 == 'null') {
            // chỉ có 1 thằng sinh viên -> tạo 1 lần
            let users2 = await db.Criteriahoidong.findOne({
                where: { userstudentId: data.idSV1.id1 }
            });
            let findPB1orPb2 = await db.Userteacher.findOne({
                where: { maSo: data.maSoGV.maSoGV }
            });
            // tính điểm trung binh phan bien cho sinh viên đầu tiên
            let findTBPhanBien = await db.Result.findOne({
                where: { userstudentId: data.idSV1.id1 }
            });
            let finddiemCTHD = findTBPhanBien.diemCTHD
            let finddiemTK = findTBPhanBien.diemTK
            let finddiemUV = findTBPhanBien.diemUV
            let trungbinhHoiDongCTHD = finddiemTK && finddiemUV
                ? (parseFloat(data.dataSV1.diem) + parseFloat(finddiemTK) + parseFloat(finddiemUV)) / 3
                : null;
            let trungbinhHoiDongTK = finddiemCTHD && finddiemUV
                ? (parseFloat(data.dataSV1.diem) + parseFloat(finddiemCTHD) + parseFloat(finddiemUV)) / 3
                : null;
            let trungbinhHoiDongUV = finddiemCTHD && finddiemTK
                ? (parseFloat(data.dataSV1.diem) + parseFloat(finddiemCTHD) + parseFloat(finddiemTK)) / 3
                : null;


            if (users2) {
                // đã tồn tại trong db rồi nên chỉ cần update
                if (findPB1orPb2.id == data.CTHD.CTHD) {
                    await db.Result.update({
                        diemCTHD: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhHoiDongCTHD
                    }, { where: { userstudentId: data.idSV1.id1 }, })

                    await db.Criteriahoidong.update({
                        LOL1: data.dataSV1.LOL1,
                        LOL2: data.dataSV1.LOL2,
                        LOL3: data.dataSV1.LOL3,
                        LOL4: data.dataSV1.LOL4,
                        LOL5: data.dataSV1.LOL5,
                        LOL6: data.dataSV1.LOL6,
                        LOL7: data.dataSV1.LOL7,
                        LOL8: data.dataSV1.LOL8,
                        ghichu: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV1.id1 }, })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                } else if (findPB1orPb2.id == data.TK.TK) {
                    await db.Result.update({
                        diemTK: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhHoiDongTK
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    await db.Criteriahoidong.update({
                        LOL1TK: data.dataSV1.LOL1,
                        LOL2TK: data.dataSV1.LOL2,
                        LOL3TK: data.dataSV1.LOL3,
                        LOL4TK: data.dataSV1.LOL4,
                        LOL5TK: data.dataSV1.LOL5,
                        LOL6TK: data.dataSV1.LOL6,
                        LOL7TK: data.dataSV1.LOL7,
                        LOL8TK: data.dataSV1.LOL8,
                        ghichuTK: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV1.id1 }, })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                }else if (findPB1orPb2.id == data.UV.UV) {
                    await db.Result.update({
                        diemUV: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhHoiDongUV
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    await db.Criteriahoidong.update({
                        LOL1UV: data.dataSV1.LOL1,
                        LOL2UV: data.dataSV1.LOL2,
                        LOL3UV: data.dataSV1.LOL3,
                        LOL4UV: data.dataSV1.LOL4,
                        LOL5UV: data.dataSV1.LOL5,
                        LOL6UV: data.dataSV1.LOL6,
                        LOL7UV: data.dataSV1.LOL7,
                        LOL8UV: data.dataSV1.LOL8,
                        ghichuUV: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV1.id1 }, })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                }
                 else {
                    return {
                        EM: 'Không thể xác định gv phản 1 hay 2',
                        EC: 1,
                        DT: []
                    }
                }

            } else {
                if (findPB1orPb2.id == data.CTHD.CTHD) {
                    await db.Result.update({
                        diemCTHD: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhHoiDongCTHD
                    }, { where: { userstudentId: data.idSV1.id1 }, })

                    await db.Criteriahoidong.create({
                        userstudentId: data.idSV1.id1,
                        LOL1: data.dataSV1.LOL1,
                        LOL2: data.dataSV1.LOL2,
                        LOL3: data.dataSV1.LOL3,
                        LOL4: data.dataSV1.LOL4,
                        LOL5: data.dataSV1.LOL5,
                        LOL6: data.dataSV1.LOL6,
                        LOL7: data.dataSV1.LOL7,
                        LOL8: data.dataSV1.LOL8,
                        ghichu: data.dataSV1.ghichu,
                    })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                } else if (findPB1orPb2.id == data.TK.TK) {
                    await db.Result.update({
                        diemTK: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhHoiDongTK
                    }, { where: { userstudentId: data.idSV1.id1 }, })

                    await db.Criteriahoidong.create({
                        userstudentId: data.idSV1.id1,
                        LOL1TK: data.dataSV1.LOL1,
                        LOL2TK: data.dataSV1.LOL2,
                        LOL3TK: data.dataSV1.LOL3,
                        LOL4TK: data.dataSV1.LOL4,
                        LOL5TK: data.dataSV1.LOL5,
                        LOL6TK: data.dataSV1.LOL6,
                        LOL7TK: data.dataSV1.LOL7,
                        LOL8TK: data.dataSV1.LOL8,
                        ghichuTK: data.dataSV1.ghichu,
                    })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                } 
                else if (findPB1orPb2.id == data.UV.UV) {
                    await db.Result.update({
                        diemUV: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhHoiDongUV
                    }, { where: { userstudentId: data.idSV1.id1 }, })

                    await db.Criteriahoidong.create({
                        userstudentId: data.idSV1.id1,
                        LOL1UV: data.dataSV1.LOL1,
                        LOL2UV: data.dataSV1.LOL2,
                        LOL3UV: data.dataSV1.LOL3,
                        LOL4UV: data.dataSV1.LOL4,
                        LOL5UV: data.dataSV1.LOL5,
                        LOL6UV: data.dataSV1.LOL6,
                        LOL7UV: data.dataSV1.LOL7,
                        LOL8UV: data.dataSV1.LOL8,
                        ghichuUV: data.dataSV1.ghichu,
                    })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                }
                else {
                    return {
                        EM: 'Không thể xác định gv phản 1 hay 2',
                        EC: 1,
                        DT: []
                    }
                }
            }
        } else {

            // Có 2 đứa... tạo 2 lần 
            let users2 = await db.Criteriahoidong.findOne({
                where: { userstudentId: data.idSV1.id1 }
            });
            let users1 = await db.Criteriahoidong.findOne({
                where: { userstudentId: data.idSV2.id2 }
            });
            let findPB1orPb2 = await db.Userteacher.findOne({
                where: { maSo: data.maSoGV.maSoGV }
            });
            let findTBPhanBien = await db.Result.findOne({
                where: { userstudentId: data.idSV1.id1 }
            });
            let finddiemCTHD = findTBPhanBien.diemCTHD
            let finddiemTK = findTBPhanBien.diemTK
            let finddiemUV = findTBPhanBien.diemUV
            let trungbinhHoiDongCTHD = finddiemTK && finddiemUV
                ? (parseFloat(data.dataSV1.diem) + parseFloat(finddiemTK) + parseFloat(finddiemUV)) / 3
                : null;
            let trungbinhHoiDongTK = finddiemCTHD && finddiemUV
                ? (parseFloat(data.dataSV1.diem) + parseFloat(finddiemCTHD) + parseFloat(finddiemUV)) / 3
                : null;
            let trungbinhHoiDongUV = finddiemCTHD && finddiemTK
                ? (parseFloat(data.dataSV1.diem) + parseFloat(finddiemCTHD) + parseFloat(finddiemTK)) / 3
                : null;

            //tính điểm trung binh phan bien cho sinh vien thứ 2 
            let SV2findTBPhanBien = await db.Result.findOne({
                where: { userstudentId: data.idSV2.id2 }
            });
            let SV2finddiemCTHD = SV2findTBPhanBien.diemCTHD
            let SV2finddiemTK = SV2findTBPhanBien.diemTK
            let SV2finddiemUV = SV2findTBPhanBien.diemUV
            let SV2trungbinhHoiDongCTHD = SV2finddiemTK && SV2finddiemUV
                ? (parseFloat(data.dataSV1.diem) + parseFloat(SV2finddiemTK) + parseFloat(SV2finddiemUV)) / 3
                : null;
            let SV2trungbinhHoiDongTK = SV2finddiemCTHD && SV2finddiemUV
                ? (parseFloat(data.dataSV1.diem) + parseFloat(SV2finddiemCTHD) + parseFloat(SV2finddiemUV)) / 3
                : null;
            let SV2trungbinhHoiDongUV = SV2finddiemCTHD && SV2finddiemTK
                ? (parseFloat(data.dataSV1.diem) + parseFloat(SV2finddiemCTHD) + parseFloat(SV2finddiemTK)) / 3
                : null;

            if (users2 && users1) {
                // tìm thấy 2 đứa-> chỉ cần update 
                if (findPB1orPb2.id == data.CTHD.CTHD) {
                    // lần đầu cho đứa thứ 1
                    await db.Result.update({
                        diemCTHD: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhHoiDongCTHD
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    // lần 2 cho đứa thứ 2
                    await db.Result.update({
                        diemCTHD: data.dataSV2.diem,
                        trungbinhhoidong: SV2trungbinhHoiDongCTHD
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    //update lần 1 cho sv1
                    await db.Criteriahoidong.update({
                        LOL1: data.dataSV1.LOL1,
                        LOL2: data.dataSV1.LOL2,
                        LOL3: data.dataSV1.LOL3,
                        LOL4: data.dataSV1.LOL4,
                        LOL5: data.dataSV1.LOL5,
                        LOL6: data.dataSV1.LOL6,
                        LOL7: data.dataSV1.LOL7,
                        LOL8: data.dataSV1.LOL8,
                        ghichu: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    //update lần 2 cho sv2
                    await db.Criteriahoidong.update({
                        LOL1: data.dataSV2.LOL1,
                        LOL2: data.dataSV2.LOL2,
                        LOL3: data.dataSV2.LOL3,
                        LOL4: data.dataSV2.LOL4,
                        LOL5: data.dataSV2.LOL5,
                        LOL6: data.dataSV2.LOL6,
                        LOL7: data.dataSV2.LOL7,
                        LOL8: data.dataSV2.LOL8,
                        ghichu: data.dataSV2.ghichu,
                    }, { where: { userstudentId: data.idSV2.id2 }, })


                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }

                } else if (findPB1orPb2.id == data.TK.TK) {
                    // lần đầu cho đứa thứ 1
                    await db.Result.update({
                        diemTK: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhHoiDongTK
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    // lần 2 cho đứa thứ 2
                    await db.Result.update({
                        diemTK: data.dataSV2.diem,
                        trungbinhhoidong: SV2trungbinhHoiDongTK
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    //update lần 1 cho sv1
                    await db.Criteriahoidong.update({
                        LOL1TK: data.dataSV1.LOL1,
                        LOL2TK: data.dataSV1.LOL2,
                        LOL3TK: data.dataSV1.LOL3,
                        LOL4TK: data.dataSV1.LOL4,
                        LOL5TK: data.dataSV1.LOL5,
                        LOL6TK: data.dataSV1.LOL6,
                        LOL7TK: data.dataSV1.LOL7,
                        LOL8TK: data.dataSV1.LOL8,
                        ghichuTK: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    //update lần 2 cho sv2
                    await db.Criteriahoidong.update({
                        LOL1TK: data.dataSV2.LOL1,
                        LOL2TK: data.dataSV2.LOL2,
                        LOL3TK: data.dataSV2.LOL3,
                        LOL4TK: data.dataSV2.LOL4,
                        LOL5TK: data.dataSV2.LOL5,
                        LOL6TK: data.dataSV2.LOL6,
                        LOL7TK: data.dataSV2.LOL7,
                        LOL8TK: data.dataSV2.LOL8,
                        ghichuTK: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                } else if (findPB1orPb2.id == data.UV.UV) {
                    // lần đầu cho đứa thứ 1
                    await db.Result.update({
                        diemUV: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhHoiDongUV
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    // lần 2 cho đứa thứ 2
                    await db.Result.update({
                        diemUV: data.dataSV2.diem,
                        trungbinhhoidong: SV2trungbinhHoiDongUV
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    //update lần 1 cho sv1
                    await db.Criteriahoidong.update({
                        LOL1UV: data.dataSV1.LOL1,
                        LOL2UV: data.dataSV1.LOL2,
                        LOL3UV: data.dataSV1.LOL3,
                        LOL4UV: data.dataSV1.LOL4,
                        LOL5UV: data.dataSV1.LOL5,
                        LOL6UV: data.dataSV1.LOL6,
                        LOL7UV: data.dataSV1.LOL7,
                        LOL8UV: data.dataSV1.LOL8,
                        ghichuUV: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    //update lần 2 cho sv2
                    await db.Criteriahoidong.update({
                        LOL1UV: data.dataSV2.LOL1,
                        LOL2UV: data.dataSV2.LOL2,
                        LOL3UV: data.dataSV2.LOL3,
                        LOL4UV: data.dataSV2.LOL4,
                        LOL5UV: data.dataSV2.LOL5,
                        LOL6UV: data.dataSV2.LOL6,
                        LOL7UV: data.dataSV2.LOL7,
                        LOL8UV: data.dataSV2.LOL8,
                        ghichuUV: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                }
                 else {
                    return {
                        EM: 'Không thể xác định gv phản 1 hay 2',
                        EC: 1,
                        DT: []
                    }
                }

            } else {
                //không tìm thấy 2 đứa trong bản Criteriapb 
                // tìm thấy 2 đứa-> thì create bảng Criteriapb và update bảng result
                if (findPB1orPb2.id == data.CTHD.CTHD) {
                    // lần đầu cho đứa thứ 1
                    await db.Result.update({
                        diemCTHD: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhHoiDongCTHD
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    // lần 2 cho đứa thứ 2
                    await db.Result.update({
                        diemCTHD: data.dataSV2.diem,
                        trungbinhhoidong: SV2trungbinhHoiDongCTHD
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    // làm cho đứa thứ 1
                    await db.Criteriahoidong.create({
                        userstudentId: data.idSV1.id1,
                        LOL1: data.dataSV1.LOL1,
                        LOL2: data.dataSV1.LOL2,
                        LOL3: data.dataSV1.LOL3,
                        LOL4: data.dataSV1.LOL4,
                        LOL5: data.dataSV1.LOL5,
                        LOL6: data.dataSV1.LOL6,
                        LOL7: data.dataSV1.LOL7,
                        LOL8: data.dataSV1.LOL8,
                        ghichu: data.dataSV1.ghichu,
                    })

                    // làm cho đứa thứ 2 
                    await db.Criteriahoidong.create({
                        userstudentId: data.idSV2.id2,
                        LOL1: data.dataSV2.LOL1,
                        LOL2: data.dataSV2.LOL2,
                        LOL3: data.dataSV2.LOL3,
                        LOL4: data.dataSV2.LOL4,
                        LOL5: data.dataSV2.LOL5,
                        LOL6: data.dataSV2.LOL6,
                        LOL7: data.dataSV2.LOL7,
                        LOL8: data.dataSV2.LOL8,
                        ghichu: data.dataSV1.ghichu,
                    })
                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }

                } else if (findPB1orPb2.id == data.TK.TK) {
                    // lần đầu cho đứa thứ 1
                    await db.Result.update({
                        diemTK: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhHoiDongTK
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    // lần 2 cho đứa thứ 2
                    await db.Result.update({
                        diemTK: data.dataSV2.diem,
                        trungbinhhoidong: SV2trungbinhHoiDongTK
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    // làm cho đứa thứ 1
                    await db.Criteriahoidong.create({
                        userstudentId: data.idSV1.id1,
                        LOL1TK: data.dataSV1.LOL1,
                        LOL2TK: data.dataSV1.LOL2,
                        LOL3TK: data.dataSV1.LOL3,
                        LOL4TK: data.dataSV1.LOL4,
                        LOL5TK: data.dataSV1.LOL5,
                        LOL6TK: data.dataSV1.LOL6,
                        LOL7TK: data.dataSV1.LOL7,
                        LOL8TK: data.dataSV1.LOL8,
                        ghichuTK: data.dataSV1.ghichu,
                    })

                    // làm cho đứa thứ 2 
                    await db.Criteriahoidong.create({
                        userstudentId: data.idSV2.id2,
                        LOL1TK: data.dataSV2.LOL1,
                        LOL2TK: data.dataSV2.LOL2,
                        LOL3TK: data.dataSV2.LOL3,
                        LOL4TK: data.dataSV2.LOL4,
                        LOL5TK: data.dataSV2.LOL5,
                        LOL6TK: data.dataSV2.LOL6,
                        LOL7TK: data.dataSV2.LOL7,
                        LOL8TK: data.dataSV2.LOL8,
                        ghichuTK: data.dataSV1.ghichu,
                    })
                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }

                }
                else if (findPB1orPb2.id == data.UV.UV) {
                    // lần đầu cho đứa thứ 1
                    await db.Result.update({
                        diemUV: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhHoiDongUV
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    // lần 2 cho đứa thứ 2
                    await db.Result.update({
                        diemUV: data.dataSV2.diem,
                        trungbinhhoidong: SV2trungbinhHoiDongUV
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    // làm cho đứa thứ 1
                    await db.Criteriahoidong.create({
                        userstudentId: data.idSV1.id1,
                        LOL1UV: data.dataSV1.LOL1,
                        LOL2UV: data.dataSV1.LOL2,
                        LOL3UV: data.dataSV1.LOL3,
                        LOL4UV: data.dataSV1.LOL4,
                        LOL5UV: data.dataSV1.LOL5,
                        LOL6UV: data.dataSV1.LOL6,
                        LOL7UV: data.dataSV1.LOL7,
                        LOL8UV: data.dataSV1.LOL8,
                        ghichuUV: data.dataSV1.ghichu,
                    })

                    // làm cho đứa thứ 2 
                    await db.Criteriahoidong.create({
                        userstudentId: data.idSV2.id2,
                        LOL1UV: data.dataSV2.LOL1,
                        LOL2UV: data.dataSV2.LOL2,
                        LOL3UV: data.dataSV2.LOL3,
                        LOL4UV: data.dataSV2.LOL4,
                        LOL5UV: data.dataSV2.LOL5,
                        LOL6UV: data.dataSV2.LOL6,
                        LOL7UV: data.dataSV2.LOL7,
                        LOL8UV: data.dataSV2.LOL8,
                        ghichuUV: data.dataSV1.ghichu,
                    })
                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }

                }
                else {
                    return {
                        EM: 'Không thể xác định gv phản 1 hay 2',
                        EC: 1,
                        DT: []
                    }
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

const ChamPoster = async (data) => {
    try {
        if (data.idSV2.id2 == 'null') {
            // chỉ có 1 thằng sinh viên -> tạo 1 lần
            let users2 = await db.Criteriahoidong.findOne({
                where: { userstudentId: data.idSV1.id1 }
            });
            let findPB1orPb2 = await db.Userteacher.findOne({
                where: { maSo: data.maSoGV.maSoGV }
            });
            // tính điểm trung binh phan bien cho sinh viên đầu tiên
            let findTBPhanBien = await db.Result.findOne({
                where: { userstudentId: data.idSV1.id1 }
            });
            let finddiemPoster1 = findTBPhanBien.diemPoster1
            let finddiemPoster2 = findTBPhanBien.diemPoster2
            let trungbinhPoster1 = finddiemPoster2
                ? (parseFloat(data.dataSV1.diem) + parseFloat(finddiemPoster2)) / 2
                : null;
            let trungbinhPoster2 = finddiemPoster1 
                ? (parseFloat(data.dataSV1.diem) + parseFloat(finddiemPoster1)) / 2
                : null;
    

            if (users2) {
                // đã tồn tại trong db rồi nên chỉ cần update
                if (findPB1orPb2.id == data.Poster1.Poster1) {
                    await db.Result.update({
                        diemPoster1: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhPoster1
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    await db.Criteriahoidong.update({
                        LOL1Poster1: data.dataSV1.LOL1,
                        LOL2Poster1: data.dataSV1.LOL2,
                        LOL3Poster1: data.dataSV1.LOL3,
                        LOL4Poster1: data.dataSV1.LOL4,
                        LOL5Poster1: data.dataSV1.LOL5,
                        LOL6Poster1: data.dataSV1.LOL6,
                        LOL7Poster1: data.dataSV1.LOL7,
                        LOL8Poster1: data.dataSV1.LOL8,
                        ghichuPoster1: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV1.id1 }, })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                } else if (findPB1orPb2.id == data.Poster2.Poster2) {
                    await db.Result.update({
                        diemPoster2: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhPoster2
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    await db.Criteriahoidong.update({
                        LOL1Poster2: data.dataSV1.LOL1,
                        LOL2Poster2: data.dataSV1.LOL2,
                        LOL3Poster2: data.dataSV1.LOL3,
                        LOL4Poster2: data.dataSV1.LOL4,
                        LOL5Poster2: data.dataSV1.LOL5,
                        LOL6Poster2: data.dataSV1.LOL6,
                        LOL7Poster2: data.dataSV1.LOL7,
                        LOL8Poster2: data.dataSV1.LOL8,
                        ghichuPoster2: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV1.id1 }, })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                }
                 else {
                    return {
                        EM: 'Không thể xác định gv phản 1 hay 2',
                        EC: 1,
                        DT: []
                    }
                }

            } else {
                if (findPB1orPb2.id == data.Poster1.Poster1) {
                    await db.Result.update({
                        diemPoster1: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhPoster1
                    }, { where: { userstudentId: data.idSV1.id1 }, })

                    await db.Criteriahoidong.create({
                        userstudentId: data.idSV1.id1,
                        LOL1Poster1: data.dataSV1.LOL1,
                        LOL2Poster1: data.dataSV1.LOL2,
                        LOL3Poster1: data.dataSV1.LOL3,
                        LOL4Poster1: data.dataSV1.LOL4,
                        LOL5Poster1: data.dataSV1.LOL5,
                        LOL6Poster1: data.dataSV1.LOL6,
                        LOL7Poster1: data.dataSV1.LOL7,
                        LOL8Poster1: data.dataSV1.LOL8,
                        ghichuPoster1: data.dataSV1.ghichu,
                    })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                } else if (findPB1orPb2.id == data.Poster2.Poster2) {
                    await db.Result.update({
                        diemTK: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhPoster2
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    await db.Criteriahoidong.create({
                        userstudentId: data.idSV1.id1,
                        LOL1Poster2: data.dataSV1.LOL1,
                        LOL2Poster2: data.dataSV1.LOL2,
                        LOL3Poster2: data.dataSV1.LOL3,
                        LOL4Poster2: data.dataSV1.LOL4,
                        LOL5Poster2: data.dataSV1.LOL5,
                        LOL6Poster2: data.dataSV1.LOL6,
                        LOL7Poster2: data.dataSV1.LOL7,
                        LOL8Poster2: data.dataSV1.LOL8,
                        ghichuPoster2: data.dataSV1.ghichu,
                    })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                } 
               
                else {
                    return {
                        EM: 'Không thể xác định gv phản 1 hay 2',
                        EC: 1,
                        DT: []
                    }
                }
            }
        } else {

            // Có 2 đứa... tạo 2 lần 
            let users2 = await db.Criteriahoidong.findOne({
                where: { userstudentId: data.idSV1.id1 }
            });
            let users1 = await db.Criteriahoidong.findOne({
                where: { userstudentId: data.idSV2.id2 }
            });
            let findPB1orPb2 = await db.Userteacher.findOne({
                where: { maSo: data.maSoGV.maSoGV }
            });
            let findTBPhanBien = await db.Result.findOne({
                where: { userstudentId: data.idSV1.id1 }
            });
            let finddiemPoster1 = findTBPhanBien.diemPoster1
            let finddiemPoster2 = findTBPhanBien.diemPoster2
            let trungbinhPoster1 = finddiemPoster2
                ? (parseFloat(data.dataSV1.diem) + parseFloat(finddiemPoster2)) / 2
                : null;
            let trungbinhPoster2 = finddiemPoster1 
                ? (parseFloat(data.dataSV1.diem) + parseFloat(finddiemPoster1)) / 2
                : null;

            //tính điểm trung binh phan bien cho sinh vien thứ 2 
            let SV2findTBPhanBien = await db.Result.findOne({
                where: { userstudentId: data.idSV2.id2 }
            });
            let SV2finddiemPoster1 = SV2findTBPhanBien.diemPoster1
            let SV2finddiemPoster2 = SV2findTBPhanBien.diemPoster2
            let SV2trungbinhPoster1 = SV2finddiemPoster2
                ? (parseFloat(data.dataSV1.diem) + parseFloat(SV2finddiemPoster2)) / 2
                : null;
            let SV2trungbinhPoster2 = SV2finddiemPoster1 
                ? (parseFloat(data.dataSV1.diem) + parseFloat(SV2finddiemPoster1)) / 2
                : null;

            if (users2 && users1) {
                // tìm thấy 2 đứa-> chỉ cần update 
                if (findPB1orPb2.id == data.Poster1.Poster1) {
                    // lần đầu cho đứa thứ 1
                    await db.Result.update({
                        diemPoster1: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhPoster1
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    // lần 2 cho đứa thứ 2
                    await db.Result.update({
                        diemPoster1: data.dataSV2.diem,
                        trungbinhhoidong: SV2trungbinhPoster1
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    //update lần 1 cho sv1
                    await db.Criteriahoidong.update({
                        LOL1Poster1: data.dataSV1.LOL1,
                        LOL2Poster1: data.dataSV1.LOL2,
                        LOL3Poster1: data.dataSV1.LOL3,
                        LOL4Poster1: data.dataSV1.LOL4,
                        LOL5Poster1: data.dataSV1.LOL5,
                        LOL6Poster1: data.dataSV1.LOL6,
                        LOL7Poster1: data.dataSV1.LOL7,
                        LOL8Poster1: data.dataSV1.LOL8,
                        ghichuPoster1: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    //update lần 2 cho sv2
                    await db.Criteriahoidong.update({
                        LOL1Poster1: data.dataSV2.LOL1,
                        LOL2Poster1: data.dataSV2.LOL2,
                        LOL3Poster1: data.dataSV2.LOL3,
                        LOL4Poster1: data.dataSV2.LOL4,
                        LOL5Poster1: data.dataSV2.LOL5,
                        LOL6Poster1: data.dataSV2.LOL6,
                        LOL7Poster1: data.dataSV2.LOL7,
                        LOL8Poster1: data.dataSV2.LOL8,
                        ghichuPoster1: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV2.id2 }, })


                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }

                } else if (findPB1orPb2.id == data.Poster2.Poster2) {
                    // lần đầu cho đứa thứ 1
                    await db.Result.update({
                        diemPoster2: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhPoster2
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    // lần 2 cho đứa thứ 2
                    await db.Result.update({
                        diemPoster2: data.dataSV2.diem,
                        trungbinhhoidong: SV2trungbinhPoster2
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    //update lần 1 cho sv1
                    await db.Criteriahoidong.update({
                        LOL1Poster2: data.dataSV1.LOL1,
                        LOL2Poster2: data.dataSV1.LOL2,
                        LOL3Poster2: data.dataSV1.LOL3,
                        LOL4Poster2: data.dataSV1.LOL4,
                        LOL5Poster2: data.dataSV1.LOL5,
                        LOL6Poster2: data.dataSV1.LOL6,
                        LOL7Poster2: data.dataSV1.LOL7,
                        LOL8Poster2: data.dataSV1.LOL8,
                        ghichuPoster2: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    //update lần 2 cho sv2
                    await db.Criteriahoidong.update({
                        LOL1Poster2: data.dataSV2.LOL1,
                        LOL2Poster2: data.dataSV2.LOL2,
                        LOL3Poster2: data.dataSV2.LOL3,
                        LOL4Poster2: data.dataSV2.LOL4,
                        LOL5Poster2: data.dataSV2.LOL5,
                        LOL6Poster2: data.dataSV2.LOL6,
                        LOL7Poster2: data.dataSV2.LOL7,
                        LOL8Poster2: data.dataSV2.LOL8,
                        ghichuPoster2: data.dataSV1.ghichu,
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }
                }
                 else {
                    return {
                        EM: 'Không thể xác định gv phản 1 hay 2',
                        EC: 1,
                        DT: []
                    }
                }

            } else {
                //không tìm thấy 2 đứa trong bản Criteriapb 
                // tìm thấy 2 đứa-> thì create bảng Criteriapb và update bảng result
                if (findPB1orPb2.id == data.Poster1.Poster1) {
                    // lần đầu cho đứa thứ 1
                    await db.Result.update({
                        diemPoster1: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhPoster1
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    // lần 2 cho đứa thứ 2
                    await db.Result.update({
                        diemPoster1: data.dataSV2.diem,
                        trungbinhhoidong: SV2trungbinhPoster1
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    // làm cho đứa thứ 1
                    await db.Criteriahoidong.create({
                        userstudentId: data.idSV1.id1,
                        LOL1Poster1: data.dataSV1.LOL1,
                        LOL2Poster1: data.dataSV1.LOL2,
                        LOL3Poster1: data.dataSV1.LOL3,
                        LOL4Poster1: data.dataSV1.LOL4,
                        LOL5Poster1: data.dataSV1.LOL5,
                        LOL6Poster1: data.dataSV1.LOL6,
                        LOL7Poster1: data.dataSV1.LOL7,
                        LOL8Poster1: data.dataSV1.LOL8,
                        ghichuPoster1: data.dataSV1.ghichu,
                    })

                    // làm cho đứa thứ 2 
                    await db.Criteriahoidong.create({
                        userstudentId: data.idSV2.id2,
                        LOL1Poster1: data.dataSV2.LOL1,
                        LOL2Poster1: data.dataSV2.LOL2,
                        LOL3Poster1: data.dataSV2.LOL3,
                        LOL4Poster1: data.dataSV2.LOL4,
                        LOL5Poster1: data.dataSV2.LOL5,
                        LOL6Poster1: data.dataSV2.LOL6,
                        LOL7Poster1: data.dataSV2.LOL7,
                        LOL8Poster1: data.dataSV2.LOL8,
                        ghichuPoster1: data.dataSV1.ghichu,
                    })
                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }

                } else if (findPB1orPb2.id == data.Poster2.Poster2) {
                    // lần đầu cho đứa thứ 1
                    await db.Result.update({
                        diemPoster2: data.dataSV1.diem,
                        trungbinhhoidong: trungbinhPoster2
                    }, { where: { userstudentId: data.idSV1.id1 }, })
                    // lần 2 cho đứa thứ 2
                    await db.Result.update({
                        diemPoster2: data.dataSV2.diem,
                        trungbinhhoidong: SV2trungbinhPoster2
                    }, { where: { userstudentId: data.idSV2.id2 }, })

                    // làm cho đứa thứ 1
                    await db.Criteriahoidong.create({
                        userstudentId: data.idSV1.id1,
                        LOL1Poster2: data.dataSV1.LOL1,
                        LOL2Poster2: data.dataSV1.LOL2,
                        LOL3Poster2: data.dataSV1.LOL3,
                        LOL4Poster2: data.dataSV1.LOL4,
                        LOL5Poster2: data.dataSV1.LOL5,
                        LOL6Poster2: data.dataSV1.LOL6,
                        LOL7Poster2: data.dataSV1.LOL7,
                        LOL8Poster2: data.dataSV1.LOL8,
                        ghichuPoster2: data.dataSV1.ghichu,
                    })

                    // làm cho đứa thứ 2 
                    await db.Criteriahoidong.create({
                        userstudentId: data.idSV2.id2,
                        LOL1Poster2: data.dataSV2.LOL1,
                        LOL2Poster2: data.dataSV2.LOL2,
                        LOL3Poster2: data.dataSV2.LOL3,
                        LOL4Poster2: data.dataSV2.LOL4,
                        LOL5Poster2: data.dataSV2.LOL5,
                        LOL6Poster2: data.dataSV2.LOL6,
                        LOL7Poster2: data.dataSV2.LOL7,
                        LOL8Poster2: data.dataSV2.LOL8,
                        ghichuPoster2: data.dataSV1.ghichu,
                    })
                    return {
                        EM: 'Cập nhật đánh giá phản biện thành công',
                        EC: 0,
                        DT: []
                    }

                }
                else {
                    return {
                        EM: 'Không thể xác định gv phản 1 hay 2',
                        EC: 1,
                        DT: []
                    }
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

const XemKetQuachamPhanBienSV2 = async (group, id) => {
    try {
        if(group != 'null') 
        {
            let users = await db.Userstudent.findAll({
                where: { groupStudent: group },
                include: [
                    {
                        model: db.Result,
                        // Nếu muốn lấy cả userStudent không có result
                    },
                    {
                        model: db.Criteriapb,
                        // Nếu muốn lấy cả userStudent không có criteria
                    },
                    {
                        model: db.Criteriahoidong,
                        // Nếu muốn lấy cả userStudent không có criteria
                    }
                ]
            });
            return {
                EM: 'Some thing wrongs with service',
                EC: 0,
                DT: users
            }
        }else{
            let users1 = await db.Userstudent.findAll({
                where: { id: id },
                include: [
                    {
                        model: db.Result,
                        // Nếu muốn lấy cả userStudent không có result
                    },
                    {
                        model: db.Criteriapb,
                        // Nếu muốn lấy cả userStudent không có criteria
                    },
                    {
                        model: db.Criteriahoidong,
                        // Nếu muốn lấy cả userStudent không có criteria
                    }
                ]
            });
            return {
                EM: 'Some thing wrongs with service',
                EC: 0,
                DT: users1
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

const definePB1PB2 = async (maSoSV, maSoGV) => {
    try {
        let IdGV = await db.Userteacher.findOne({
            where: { maSo: maSoGV },
        });

        let PB1 = await db.Userstudent.findOne({
            where: {
                [Op.and]: [
                    { maSo: maSoSV },  // Điều kiện 1
                    { pb1: IdGV.id } // Điều kiện 2
                ]
            },
        });
        let PB2 = await db.Userstudent.findOne({
            where: {
                [Op.and]: [
                    { maSo: maSoSV },  // Điều kiện 1
                    { pb2: IdGV.id } // Điều kiện 2
                ]
            },
        });
        if (PB1) {
            return {
                EM: 'pb1',
                EC: 0,
                DT: ''
            }
        } else if (PB2) {
            return {
                EM: 'pb2',
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: 'Khong the xac dinh PB1 hay Pb2',
                EC: 1,
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

const defineHoiDong = async (maSoSV, maSoGV) => {
    try {
        let IdGV = await db.Userteacher.findOne({
            where: { maSo: maSoGV },
        });

        let CTHD = await db.Userstudent.findOne({
            where: {
                [Op.and]: [
                    { maSo: maSoSV },  // Điều kiện 1
                    { CTHD: IdGV.id } // Điều kiện 2
                ]
            },
        });
        let Tk = await db.Userstudent.findOne({
            where: {
                [Op.and]: [
                    { maSo: maSoSV },  // Điều kiện 1
                    { Tk: IdGV.id } // Điều kiện 2
                ]
            },
        });
        let UV = await db.Userstudent.findOne({
            where: {
                [Op.and]: [
                    { maSo: maSoSV },  // Điều kiện 1
                    { UV: IdGV.id } // Điều kiện 2
                ]
            },
        });
        if (CTHD) {
            return {
                EM: 'CTHD',
                EC: 0,
                DT: ''
            }
        } else if (Tk) {
            return {
                EM: 'TK',
                EC: 0,
                DT: ''
            }
        } else if (UV) {
            return {
                EM: 'UV',
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: 'Khong the xac dinh PB1 hay Pb2',
                EC: 1,
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

const definePoster = async (maSoSV, maSoGV) => {
    try {
        let IdGV = await db.Userteacher.findOne({
            where: { maSo: maSoGV },
        });

        let Poster1 = await db.Userstudent.findOne({
            where: {
                [Op.and]: [
                    { maSo: maSoSV },  // Điều kiện 1
                    { Poster1: IdGV.id } // Điều kiện 2
                ]
            },
        });
        let Poster2 = await db.Userstudent.findOne({
            where: {
                [Op.and]: [
                    { maSo: maSoSV },  // Điều kiện 1
                    { Poster2: IdGV.id } // Điều kiện 2
                ]
            },
        });      
        if (Poster1) {
            return {
                EM: 'Poster1',
                EC: 0,
                DT: ''
            }
        } else if (Poster2) {
            return {
                EM: 'Poster2',
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: 'Khong the xac dinh PB1 hay Pb2',
                EC: 1,
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

module.exports = {
    GetLichPB, GetDSHD, GetDGHD, GetSV1SV2, chamPhanBien, XemKetQuachamPhanBienSV2, definePB1PB2, defineHoiDong
    , GetLichHoiDong,GetLichPoster, ChamHoiDong, definePoster,ChamPoster

}