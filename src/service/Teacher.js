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

const XemKetQuachamPhanBienSV2 = async (group) => {
    try {

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
module.exports = {
    GetLichPB, GetDSHD, GetDGHD, GetSV1SV2, chamPhanBien, XemKetQuachamPhanBienSV2, definePB1PB2

}