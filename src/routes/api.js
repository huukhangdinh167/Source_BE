import express from "express";
const router = express.Router();
import apiController from '../controller/apiController'
import usersController from '../controller/usersController'
import groupController from '../controller/groupController'
/**
 * 
 * @param {*} app : express app
 */

const initApiRoutes = (app) => {

    // Rest api 
    // C post,  R get,  U put,  D delete
    router.get("/test-api", apiController.testApi);  
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.get("/user/read", usersController.readFunc )
    router.post("/user/create", usersController.createFunc)
    router.put("/user/update", usersController.updateFunc)
    router.delete("/user/delete", usersController.deleteFunc)

    router.get("/group/read", groupController.readFunc)
    return app.use("/api/v1", router);

}
export default initApiRoutes;