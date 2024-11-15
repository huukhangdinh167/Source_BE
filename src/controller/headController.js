
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

        let data = await Head.headDeleteProjectRegisterUser(req.body.data.maSo,req.body.data.groupStudent )
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

const headApproveProjectFnc =async(req, res)=>{
    try {

        let data = await Head.headApproveProject(req.body.data.id )
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
    headReadProjectandUserFnc ,headDeleteProjectFnc,headDeleteRegisterProjectStudentFnc,headGetProjectApproveFnc,headApproveProjectFnc
}