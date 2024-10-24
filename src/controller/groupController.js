import groupService from '../service/groupService'
const readFunc = async(req, res)=>{
    try {
        let data = await groupService.getGroup()
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data 
        })
        
    } catch (e) {

         console.log(e)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }

}
module.exports ={
    readFunc
}