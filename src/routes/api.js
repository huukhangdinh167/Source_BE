import express from "express";
const router = express.Router();
import apiController from '../controller/apiController'
import usersController from '../controller/usersController'
import groupController from '../controller/groupController'
import roleController from '../controller/roleController'
import adminController from '../controller/adminController'
import headController from '../controller/headController'
import { checkUserJwt, checkPermission } from '../middleware/JWTAction'
import studentController from '../controller/studentController'
import teacherController from '../controller/teacherController'
import projectController from '../controller/projectController'


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
  router.get("/role/by-group/:groupId", roleController.getRoleByGroup)  // nếu sử dụng middleware thì sẽ bị lỗi 
  router.post("/role/assign-to-group", checkUserJwt, checkPermission, roleController.assignRoleToGroup)

  // group router
  router.get("/group/read", groupController.readFunc)
  // ADMIN 
  router.post("/admin/create-teacher", checkUserJwt, checkPermission, adminController.adminCreateTeacherFunc)
  router.post("/admin/create-user", checkUserJwt, checkPermission, adminController.adminCreateUserFunc)
  router.get("/admin/read-user", adminController.adminReadUserFunc)
  router.put("/admin/update-user", checkUserJwt, checkPermission, adminController.adminUpdateFnc)
  router.delete("/admin/delete-user", checkUserJwt, checkPermission, adminController.admindDeleteFunc)
  // STUDENT 
  router.put("/student/project/read", checkUserJwt, checkPermission, studentController.ReadProjectFnc)
  router.put("/student/dangki", checkUserJwt, checkPermission, studentController.dangkiFunc)
  router.put("/student/huydangki", checkUserJwt, checkPermission, studentController.huydangkiFunc)
  router.put("/student/project/dadangki", checkUserJwt, checkPermission, studentController.ReadProjectRegisterFnc)
  router.put("/student/project/useregistproject", checkUserJwt, checkPermission, studentController.useRegistProjectFnc)
  router.put("/student/project/choosegroup", checkUserJwt, checkPermission, studentController.chooseGroupFnc)
  router.put("/student/project/cancelchoosegroup", checkUserJwt, checkPermission, studentController.cancelChooseGroupFnc)
  router.put("/changepassword", checkUserJwt, checkPermission, studentController.changePassword)
  router.put("/updateinfor", checkUserJwt, checkPermission, studentController.updateinfor)
  router.put("/student/results",  studentController.allResults)

  //HEAD 
  router.get("/head/getProjectandUser",headController.headReadProjectandUserFnc)
  router.delete("/head/delete-project", checkUserJwt, checkPermission, headController.headDeleteProjectFnc) 
  router.put("/head/huydangki-detai-sinhvien", checkUserJwt, checkPermission, headController.headDeleteRegisterProjectStudentFnc)
  router.get("/head/getProjectApprove",checkUserJwt, checkPermission,  headController.headGetProjectApproveFnc)
  router.put("/head/project-approve", checkUserJwt, checkPermission, headController.headApproveProjectFnc)
  router.get("/head/project-get-list-teacher",  headController.headGetListTeacherFnc) 
  router.get("/head/get-danh-sach-hoi-dong",  headController.danhSachHoiDong)
  //-----------xem danh sách các nhóm được phản biện 
  router.get("/head/project-test",  headController.test) 
  //----------phân PB1 Pb2 
  router.put("/head/assignPB1and2",  headController.headAssignPB1and2) 
  //----------phân công Hội Đồng 
  router.put("/head/assignHoiDong",  headController.headAssignHoiDong) 
  router.get("/head/getlistTeacherHoiDong",  headController.headGetListTeacherHoiDong) 
 //-------Lấy tất cả danh sách điểm 
 router.get("/head/headGetAllResults",  headController.headAGetAllResulst) 
//----------
router.put("/head/getResultsEveryStudent",  headController.headGetResultsEveryStudent) 
  router.put("/head/assignPoster",  headController.headAssignPoster)
  router.put("/head/project-refuse",  headController.headRefuseProjectFnc) 




  //TEACHER --khang làm
  // ----xem danh sách được phân công phản biện
  router.put("/teacher/getLichChamPB",checkUserJwt, checkPermission, teacherController.teacherGetLichChamPBFnc)
  // --chấm hướng dẫn : xem ds hướng dẫn và chấm điểm hd
  router.put("/teacher/getDSHD", teacherController.teacherGetDSHDFunc)
  router.put("/teacher/DGHD", teacherController.teacherDGHDFunc)
  router.put("/teacher/getIn4SV1andSV2", teacherController.teacherGetIn4SV1andSV2Func)
  router.put("/teacher/DGPhanBien", teacherController.teacherChamPhanBienFunc) 
  router.put("/teacher/DGPHoiDong", teacherController.teacherChamHoiDongFunc)
  router.put("/teacher/DGPPoster", teacherController.teacherChamPosterFunc)
  router.put("/teacher/xemDGPhanBienSV2", teacherController.teacherXemchamPhanBienSV2Func)
  router.put("/teacher/definePB1PB2", teacherController.teacherDefinePB1PB2Func) 
  router.put("/teacher/defineHoiDong", teacherController.teacherDefineHoiDongFunc) 
  router.put("/teacher/definePoster", teacherController.teacherDefinePosterFunc) 

  router.put("/teacher/getLichHoiDong", teacherController.teacherGetLichHoiDong) 
  router.put("/teacher/getLichPoster", teacherController.teacherGetLichPoster) 
  //Teacher

  router.put("/teacher/projects/read", checkUserJwt, checkPermission, projectController.readFunc)
  router.put("/teacher/projects/create", checkUserJwt, checkPermission, projectController.createFunc)
  router.put("/teacher/projects/update", checkUserJwt, checkPermission, projectController.updateFunc)
  router.delete("/teacher/projects/delete", checkUserJwt, checkPermission, projectController.deleteFunc)
  


  return app.use("/api/v1", router)






}
export default initApiRoutes;