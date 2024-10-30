import express from "express";
const router = express.Router();
import apiController from '../controller/apiController'
import usersController from '../controller/usersController'
import groupController from '../controller/groupController'
import {checkUserJwt, checkPermission} from '../middleware/JWTAction'
/**
 * 
 * @param {*} app : express app
 */
// const testMidleWaer = (req, res, next)=>{
//     console.log("I'm hukhen")
//     next()
// }


// const checkUserLogin =(req, res, next)=>{
//     const nonSecurePaths = ['/', '/register', '/login'];
//   if (nonSecurePaths.includes(req.path)) return next();

//   //authenticate user

//   if(user){
//     next();
//   }else{

//   }

// }


const initApiRoutes = (app) => {

    // Rest api 
    // C post,  R get,  U put,  D delete

    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.get("/user/read", checkUserJwt,checkPermission, usersController.readFunc)
    router.post("/user/create", usersController.createFunc)
    router.put("/user/update", usersController.updateFunc)
    router.delete("/user/delete", usersController.deleteFunc)

    router.get("/group/read", groupController.readFunc)
    return app.use("/api/v1", router);

}
export default initApiRoutes;