import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { moduleDetailsValidation } from "./moduleDetails.validation";
import { moduleDetailsController } from "./moduleDetails.controller";

const moduleDetailsRouter = Router();
moduleDetailsRouter.post(
  "/create-moduleDetails",
  validateRequest(moduleDetailsValidation.createIModuleDetailsSchema),
  moduleDetailsController.createModuleDetails,
);
moduleDetailsRouter.get("/", moduleDetailsController.getAllModuleDetails);
moduleDetailsRouter.get("/:id", moduleDetailsController.getSingleModuleDetails);
moduleDetailsRouter.patch(
  "/:id",
  validateRequest(moduleDetailsValidation.updateIModuleDetailsSchema),
  moduleDetailsController.updateModuleDetails,
);
moduleDetailsRouter.delete("/:id", moduleDetailsController.deleteModuleDetails);
export default moduleDetailsRouter;
