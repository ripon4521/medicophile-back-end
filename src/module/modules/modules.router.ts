import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { moduleValidation } from "./modules.validation";
import { modulesController } from "./modules.controller";

const moduleRouter = Router();
moduleRouter.post(
  "/create-module",
  validateRequest(moduleValidation.createModuleSchema),
  modulesController.createModule
);
moduleRouter.patch(
  "/:id",
  validateRequest(moduleValidation.updateModuleSchema),
  modulesController.updateModule
);
moduleRouter.get("/", modulesController.getAllModule);
moduleRouter.get("/:id", modulesController.getSingleModule);
moduleRouter.delete("/:id", modulesController.deleteModule);

export default moduleRouter;
