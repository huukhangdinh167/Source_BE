import express from "express";
const router = express.Router();
import apiController from '../controller/apiController'
import usersController from '../controller/usersController'
import groupController from '../controller/groupController'
import roleController from '../controller/roleController'
import { checkUserJwt, checkPermission } from '../middleware/JWTAction'
import studentController from '../controller/studentController'
/**
 * 
 * @param {*} app : express app */


const initApiRoutes = (app) => {

  // Rest api 
  // C post,  R get,  U put,  D delete   
  // router.all(["/register", "/login", "/user/read", "/user/create", "/user/update", "/user/delete", "/group/read"], checkUserJwt, checkPermission);

  //router.use(checkUserJwt, checkPermission);


  router.post("/login", checkUserJwt, checkPermission, apiController.handleLogin);
  router.post("/logout", checkUserJwt, checkPermission, apiController.handleLogout);

  router.get("/account", checkUserJwt, checkPermission, usersController.getUserAccount);

  //user router
  router.get("/user/read", checkUserJwt, checkPermission, usersController.readFunc)
  router.post("/user/create", checkUserJwt, checkPermission, usersController.createFunc)
  router.put("/user/update", checkUserJwt, checkPermission, usersController.updateFunc)
  router.delete("/user/delete", checkUserJwt, checkPermission, usersController.deleteFunc)

  //role router 
  router.get("/role/read", checkUserJwt, checkPermission, roleController.readFunc)
  router.post("/role/create", checkUserJwt, checkPermission, roleController.createFunc)
  // todo nha  router.put("/role/update", roleController.updateFunc)
  router.delete("/role/delete", checkUserJwt, checkPermission, roleController.deleteFunc)
  router.get("/role/by-group/:groupId",  roleController.getRoleByGroup)  // nếu sử dụng middleware thì sẽ bị lỗi 
  router.post("/role/assign-to-group",checkUserJwt, checkPermission, roleController.assignRoleToGroup)

  // group router
  router.get("/group/read", groupController.readFunc)

  // STUDENT 
  router.put("/student/project/read", checkUserJwt, checkPermission, studentController.ReadProjectFnc)
  router.put("/student/dangki", checkUserJwt, checkPermission, studentController.dangkiFunc)
  router.put("/student/huydangki", checkUserJwt, checkPermission, studentController.huydangkiFunc)
  router.put("/student/project/dadangki", checkUserJwt, checkPermission, studentController.ReadProjectRegisterFnc)

  return app.use("/api/v1", router)






}
export default initApiRoutes;