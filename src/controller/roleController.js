import roleApiService from '../service/roleApiService';
const readFunc = async (req, res) => {
    try {
        // console.log("Check cookie", req.user)
       
        let data = await roleApiService.getAllRole()
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
         
        }catch (error) {
            console.log(error)
            return res.status(500).json({
                EM: 'error from server',  // eror messageE
                EC: '-1', // error code
                DT: '', //error data
            })
        }

    } 

const createFunc = async (req, res) => {
    try {
         let data = await roleApiService.createNewRole(req.body) 
        // console.log("Check respone", req.body)
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

//to doooo nha
const updateFunc = async (req, res) => {
    // try {
    //     let data = await roleApiService.updateRole(req.body)
    //     return res.status(200).json({
    //         EM: data.EM,  // eror messageE
    //         EC: data.EC, // error code
    //         DT: data.DT, //error data
    //     })
    // } catch (error) {
    //     console.log(error)
    //     return res.status(500).json({
    //         EM: 'error from server',  // eror messageE
    //         EC: '-1', // error code
    //         DT: '', //error data
    //     })
    // }
}

const deleteFunc = async (req, res) => {
    try {
        // roleApiService.deleteUser()

        // delete: FE gửi req.body.id tới BE nhận và xóa trong csdl
        let data = await roleApiService.deleteRole(req.body.id)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: '', //error data
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

const getRoleByGroup =async(req, res)=>{
    try {
       let id = req.params.groupId
        let data = await roleApiService.getRoleByGroup(id)
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

const assignRoleToGroup =async(req, res)=>{
    try {
      
        let data = await roleApiService.assignRoleToGroup(req.body.data)
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


module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc,getRoleByGroup,assignRoleToGroup
}

