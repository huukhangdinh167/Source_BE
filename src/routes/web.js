import express from "express";
import homeController from '../controller/homeController';
const router = express.Router();
import apiController from '../controller/apiController'
/**
 * 
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloword)
    router.get("/user", homeController.handleUserPage)
    router.post("/users/create-user", homeController.handleCreateNewUser);
    router.post("/delete-user/:id", homeController.handleDeleteUser);
    router.get("/update/:id", homeController.gethandleUpdateUser);
    router.post("/users/update", homeController.handleUpdateUser);

    // Rest api 
    // C post,  R get,  U put,  D delete
    // router.get("/api/test-api", apiController.testApi);

    return app.use("/", router);
}
export default initWebRoutes;