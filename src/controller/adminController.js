
import Admin from '../service/Admin'

const adminReadUserFunc = async (req, res) => {
    try {
    
            let data = await Admin.adminGetAllUser()
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

const adminCreateUserFunc =async(req, res)=>{
    try {
        let data = await Admin.admincreateNewUser(req.body)
        //  console.log("Check respone", req.body)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
} 
const adminUpdateFnc =async(req, res)=>{
    try {
        let data = await Admin.adminupdateUser(req.body)
        //  console.log("Check respone", req.body)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
} 
const adminCreateTeacherFunc = async (req, res) => {
    try {
        let data = await Admin.admincreateNewTeacher(req.body)
        //  console.log("Check respone", req.body)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

const admindDeleteFunc =async(req, res) =>{
    try {
        let data = await Admin.adminDeleteUser(req.body)
    
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

module.exports ={ adminReadUserFunc, adminCreateUserFunc,adminUpdateFnc,adminCreateTeacherFunc,admindDeleteFunc }