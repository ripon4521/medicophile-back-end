import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { moduleValidation } from "./modules.validation";
import { modulesController } from "./modules.controller";

const moduleRouter = Router();
moduleRouter.post(
  "/create-module",
  validateRequest(moduleValidation.createModuleSchema),
  modulesController.createModule,
);
moduleRouter.patch(
  "/:slug",
  validateRequest(moduleValidation.updateModuleSchema),
  modulesController.updateModule,
);
moduleRouter.get("/", modulesController.getAllModule);
moduleRouter.get("/:slug", modulesController.getSingleModule);
moduleRouter.delete("/:slug", modulesController.deleteModule);

export default moduleRouter;
