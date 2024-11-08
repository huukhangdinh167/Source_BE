import Student from '../service/Student'

const ReadProjectFnc = async (req, res) => {
    try { 
        // console.log("Check respone", req.body.data.id)
        let data = await Student.getAllProject(req.body.data.id)
        //console.log(data)
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

const dangkiFunc = async (req, res) => {
    try {
      //  console.log(req.body.data.id, req.body.data.projectId)
        let data = await Student.dangkiProject(req.body.data.id, req.body.data.projectId)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
} 

const huydangkiFunc = async (req, res) => {
    try {
        //console.log(req.body.data.id, req.body.data.projectId)
       let data = await Student.huydangkiProject(req.body.data.id, req.body.data.projectId)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
      //   console.log(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
} 

const ReadProjectRegisterFnc =async(req, res)=>{
    try {
        let data = await Student.getAllProjectRegister(req.body.data.id)
        //  console.log("Check respone", req.body)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        }) 
    //    console.log(data)
        
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
    ReadProjectFnc, dangkiFunc, ReadProjectRegisterFnc,huydangkiFunc
}