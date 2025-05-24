import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { moduleDetailsValidation } from "./moduleDetails.validation";
import { moduleDetailsController } from "./moduleDetails.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const moduleDetailsRouter = Router();
moduleDetailsRouter.post(
  "/create-moduleDetails",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(moduleDetailsValidation.createIModuleDetailsSchema),
  moduleDetailsController.createModuleDetails,
);
moduleDetailsRouter.get("/", moduleDetailsController.getAllModuleDetails);
moduleDetailsRouter.get(
  "/:id",
  moduleDetailsController.getSpeecificModuleDtails,
);
moduleDetailsRouter.get("/:id", moduleDetailsController.getSingleModuleDetails);
moduleDetailsRouter.patch(
  "/update-moduleDetails",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(moduleDetailsValidation.updateIModuleDetailsSchema),
  moduleDetailsController.updateModuleDetails,
);
moduleDetailsRouter.delete(
  "/delete-moduleDetails",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  moduleDetailsController.deleteModuleDetails,
);
export default moduleDetailsRouter;
