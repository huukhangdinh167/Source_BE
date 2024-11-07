import Student from '../service/Student'

const ReadProjectFnc =async(req, res)=>{
    try {
        let data = await Student.getAllProject()
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
module.exports ={
    ReadProjectFnc
}