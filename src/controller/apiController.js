import loginRegisterServer from '../service/loginRegisterService';


const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'

    })
}

const handleRegister = async (req, res) => {
    try {
        //req.body email, username, password, phone
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required paramerters',  // eror messageE
                EC: '1', // error code               
                DT: '', //error data


            })
        }
        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'Password must more than 4 key',  // eror messageE
                EC: '1', // error code               
                DT: '', //error data


            })
        }
        // server : create user 

        let data = await loginRegisterServer.registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: '', //error data
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data


        })
    }
    // console.log("Call me", req.body);
}

const handleLogin = async (req, res) => {

   // console.log("Chekc data Login", req.body)
   
    try {  
        // console.log("Check res", req.body)
        let data = await loginRegisterServer.handleUserLogin(req.body)
        // console.log("check login", req.body)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data 
        })
       
    } catch (error) {
        return res.status(500).json({
            EM: "Error from server",  // eror messageE
            EC: "-1", // error code
            DT: '', //error data
        })
    }

}


module.exports = {
    testApi, handleRegister, handleLogin
}