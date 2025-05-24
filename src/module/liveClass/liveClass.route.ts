import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { liveClassValidation } from "./liveClass.validation";
import { liveClassController } from "./liveClass.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const liveClassRouter = Router();
liveClassRouter.post(
  "/create-liveClass",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(liveClassValidation.createliveClassZodSchema),
  liveClassController.createLiveClass,
);
liveClassRouter.get("/", liveClassController.getAllLiveClass);
liveClassRouter.get("/:slug", liveClassController.getSingleLiveClass);
liveClassRouter.patch(
  "/:slug",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(liveClassValidation.updateliveClassZodSchema),
  liveClassController.updateLiveClass,
);
liveClassRouter.delete("/:slug",  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") ,  liveClassController.deleteLiveClass);
export default liveClassRouter;
