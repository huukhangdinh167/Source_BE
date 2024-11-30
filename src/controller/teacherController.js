import Teacher from '../service/Teacher'

const teacherGetLichChamPBFnc = async (req, res) => {
    try {
        let data = await Teacher.GetLichPB(req.body.data.maSo)

        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        //    console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

const teacherChamHoiDongFunc = async (req, res) => {
    try {

        let data = await Teacher.ChamHoiDong(req.body)

        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        //   console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }

}

const teacherChamPosterFunc = async (req, res) => {
    try {
        let data = await Teacher.ChamPoster(req.body)

        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        //    console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

const teacherGetDSHDFunc = async (req, res) => {
    try {

        let data = await Teacher.GetDSHD(req.body.data.maSo)

        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        //    console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }

}
const teacherDGHDFunc = async (req, res) => {
    try {
        let data = await Teacher.GetDGHD(req.body.data)

        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        // console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

const teacherGetIn4SV1andSV2Func = async (req, res) => {
    try {
        let data = await Teacher.GetSV1SV2(req.body.data)

        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        // console.log(req.body.data)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

const teacherChamPhanBienFunc = async (req, res) => {
    try {
        let data = await Teacher.chamPhanBien(req.body)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        //  console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

const teacherXemchamPhanBienSV2Func = async (req, res) => {
    try {
        let data = await Teacher.XemKetQuachamPhanBienSV2(req.body.data.maSo, req.body.data.id)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        //  console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

const teacherDefinePB1PB2Func = async (req, res) => {
    try {
        let data = await Teacher.definePB1PB2(req.body.data.maSoSV, req.body.data.maSoGV)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        //  console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

const teacherDefineHoiDongFunc = async (req, res) => {
    try {
        let data = await Teacher.defineHoiDong(req.body.data.maSoSV, req.body.data.maSoGV)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        //  console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

const teacherDefinePosterFunc = async (req, res) => {
    try {
        let data = await Teacher.definePoster(req.body.data.maSoSV, req.body.data.maSoGV)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        //  console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

const teacherGetLichHoiDong = async (req, res) => {
    try {
        let data = await Teacher.GetLichHoiDong(req.body.data.maSo)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT//error data
        })
        //   console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

const teacherGetLichPoster = async (req, res) => {
    try {
        let data = await Teacher.GetLichPoster(req.body.data.maSo)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT//error data
        })
        //   console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}



module.exports = {
    teacherGetLichChamPBFnc, teacherGetDSHDFunc, teacherDGHDFunc, teacherGetIn4SV1andSV2Func,
    teacherChamPhanBienFunc, teacherXemchamPhanBienSV2Func, teacherDefinePB1PB2Func,
    teacherGetLichHoiDong, teacherDefineHoiDongFunc, teacherChamHoiDongFunc,
    teacherGetLichPoster, teacherDefinePosterFunc, teacherChamPosterFunc,

}