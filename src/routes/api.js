import express from "express";
const router = express.Router();
import apiController from '../controller/apiController'
import usersController from '../controller/usersController'
import groupController from '../controller/groupController'
import roleController from '../controller/roleController'
import { checkUserJwt, checkPermission } from '../middleware/JWTAction'
/**
 * 
 * @param {*} app : express app */


const initApiRoutes = (app) => {

    // Rest api 
    // C post,  R get,  U put,  D delete   
    // router.all(["/register", "/login", "/user/read", "/user/create", "/user/update", "/user/delete", "/group/read"], checkUserJwt, checkPermission);
    
    //router.use(checkUserJwt, checkPermission);

    router.post("/register",checkUserJwt, checkPermission, apiController.handleRegister);
    router.post("/login",checkUserJwt, checkPermission, apiController.handleLogin);
    router.post("/logout",checkUserJwt, checkPermission, apiController.handleLogout);

    router.get("/account",checkUserJwt, checkPermission, usersController.getUserAccount);

    //user router
    router.get("/user/read",checkUserJwt, checkPermission, usersController.readFunc)
    router.post("/user/create",checkUserJwt, checkPermission, usersController.createFunc)
    router.put("/user/update",checkUserJwt, checkPermission, usersController.updateFunc)
    router.delete("/user/delete",checkUserJwt, checkPermission, usersController.deleteFunc)

    //role router 
    router.get("/role/read",checkUserJwt, checkPermission, roleController.readFunc)
    router.post("/role/create",roleController.createFunc)
      // todo nha  router.put("/role/update", roleController.updateFunc)
    router.delete("/role/delete",checkUserJwt, checkPermission, roleController.deleteFunc)


    // group router
    router.get("/group/read", groupController.readFunc)
    return app.use("/api/v1", router);

}
export default initApiRoutes;