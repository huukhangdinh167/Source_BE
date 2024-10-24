import db from "../models/index"

const getGroup =async ()=>{ 
    try {
        let data  =await db.Group.findAll({
            order: [['name', 'ASC']]
        });
        return {
            EM: 'Get group success',
            EC: 0,
            DT: data
        }

        
    } catch (e) {
        console.log(e)
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }

}
module.exports ={
    getGroup
}