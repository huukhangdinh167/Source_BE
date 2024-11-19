import projectApiService from '../service/projectApiService';

const readFunc = async (req, res) => {
    try {
        if (!req.body.data || !req.body.data.id) {
            return res.status(400).json({
                EM: "Missing userteacherId",
                EC: 1,
                DT: null
            });
        }
        let data = await projectApiService.getAllProject(req.body.data.id);
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
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


const createFunc = async (req, res) => {
    try {
        let data = await projectApiService.createNewProject(req.body);
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from sever', //error message
            EC: '-1', //error code
            DT: '', //date
        })
    }
}

const updateFunc = async (req, res) => {
    try {
        //validate
        let data = await projectApiService.updateProject(req.body);
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from sever', //error message
            EC: '-1', //error code
            DT: '', //date
        })

    }

}

const deleteFunc = async (req, res) => {
    try {
        let data = await projectApiService.deleteProject(req.body.id);
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT //data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from sever', //error message
            EC: '-1', //error code
            DT: '', //date
        })

    }

}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc
}

