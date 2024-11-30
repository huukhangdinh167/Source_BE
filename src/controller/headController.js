
import Head from '../service/Head'
const headReadProjectandUserFnc = async (req, res) => {
    try {

        let data = await Head.headGetProjectAndUser()
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT//error data
        })
        //  console.log(data)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}
const headGetProjectApproveFnc = async (req, res) => {
    try {

        let data = await Head.headGetProjectApprove()
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT//error data
        })
        //  console.log(data)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}
const headDeleteProjectFnc = async (req, res) => {
    try {

        let data = await Head.headDeleteProject(req.body.id)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT//error data
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

const headDeleteRegisterProjectStudentFnc = async (req, res) => {
    try {

        let data = await Head.headDeleteProjectRegisterUser(req.body.data.maSo, req.body.data.groupStudent)
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

const headApproveProjectFnc = async (req, res) => {
    try {

        let data = await Head.headApproveProject(req.body.data.id, req.body.data.name)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT//error data
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

const headRefuseProjectFnc = async (req, res) => {
    try {

       let data = await Head.headRefuseProject(req.body.data.id, req.body.data.name, req.body.data.reasonrefuse)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT//error data
        })
          //console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}
const headGetListTeacherFnc = async (req, res) => {
    try {

        let data = await Head.headGetListTeacher()
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
const test = async (req, res) => {
    try {

        let data = await Head.headtest()
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
const headAssignPB1and2 = async (req, res) => {
    try {

        let data = await Head.headAssignPB(req.body.data)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT//error data
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
const danhSachHoiDong = async (req, res) => {
    try {

        let data = await Head.headgetDSHoiDong()
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

const headAssignHoiDong = async (req, res) => {
    try {

        let data = await Head.headPhanCongHoiDong(req.body.data)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT//error data
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
const headAssignPoster = async (req, res) => {
    try {

        let data = await Head.headPhanCongPoster(req.body.data)
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
const headGetListTeacherHoiDong = async (req, res) => {
    try {
        // let data = await Head.headGetListHoiDong()
        // return res.status(200).json({
        //     EM: data.EM,  // eror messageE
        //     EC: data.EC, // error code
        //     DT: data.DT//error data
        // })
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

const headAGetAllResulst = async (req, res) => {
    try {
        let data = await Head.headGetAllResults()
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

const headGetResultsEveryStudent = async (req, res) => {
    try {
        let data = await Head.getAllResultsEveryStudetn(req.body.data.id)
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
    headReadProjectandUserFnc, headDeleteProjectFnc, headDeleteRegisterProjectStudentFnc,
    headGetProjectApproveFnc, headApproveProjectFnc, headGetListTeacherFnc, test, headAssignPB1and2,
    headRefuseProjectFnc,danhSachHoiDong,headAssignHoiDong,headAssignPoster,headGetListTeacherHoiDong,
    headAGetAllResulst,headGetResultsEveryStudent
    
}