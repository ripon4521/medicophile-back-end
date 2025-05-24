import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { offlineBatchValidation } from "./offlineBatch.validation";
import { offlineBatchController } from "./offLineBatch.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const offlineBatchRouter = Router();
offlineBatchRouter.post(
  "/create-offline-batch",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , 
  validateRequest(offlineBatchValidation.createOfflineBatchSchema),
  offlineBatchController.createOfflineBatch,
);
offlineBatchRouter.get("/",  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") ,  offlineBatchController.getAllOfflineBatch);
offlineBatchRouter.patch(
  "/:slug",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , 
  validateRequest(offlineBatchValidation.updateOfflineBatchSchema),
  offlineBatchController.updateOfflineBatch,
);
offlineBatchRouter.delete("/:slug",  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") ,  offlineBatchController.deleteOfflineBatch);
offlineBatchRouter.get("/:slug",  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") ,   offlineBatchController.getSingleOfflineBatch);
export default offlineBatchRouter;
