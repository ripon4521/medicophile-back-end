import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { moduleValidation } from "./modules.validation";
import { modulesController } from "./modules.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const moduleRouter = Router();
moduleRouter.post(
  "/create-module",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(moduleValidation.createModuleSchema),
  modulesController.createModule,
);
moduleRouter.patch(
  "/:slug",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(moduleValidation.updateModuleSchema),
  modulesController.updateModule,
);

moduleRouter.get("/", modulesController.getAllModule);
moduleRouter.get("/:id", modulesController.getSpecificModule);
moduleRouter.get("/single/:slug", modulesController.getSingleModule);
moduleRouter.delete("/:slug",  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") ,  modulesController.deleteModule);

export default moduleRouter;
