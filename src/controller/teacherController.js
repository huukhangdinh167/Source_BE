import Teacher from '../service/Teacher'

const teacherGetLichChamPBFnc =async(req, res)=>{
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

const teacherGetDSHDFunc =async(req, res)=>{
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
const teacherDGHDFunc =async(req, res)=>{
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

const teacherGetIn4SV1andSV2Func =async(req, res)=>{
    try {
        let data = await Teacher.GetSV1SV2(req.body.data )

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

const teacherChamPhanBienFunc =async(req, res)=>{
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
module.exports = {
    teacherGetLichChamPBFnc,teacherGetDSHDFunc,teacherDGHDFunc,teacherGetIn4SV1andSV2Func,teacherChamPhanBienFunc

}