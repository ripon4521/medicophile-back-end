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
moduleDetailsRouter.get(
  "/:id",
  moduleDetailsController.getSpeecificModuleDtails,
);
moduleDetailsRouter.get("/:id", moduleDetailsController.getSingleModuleDetails);
moduleDetailsRouter.patch(
  "/update-moduleDetails",
  validateRequest(moduleDetailsValidation.updateIModuleDetailsSchema),
  moduleDetailsController.updateModuleDetails,
);
moduleDetailsRouter.delete(
  "/delete-moduleDetails",
  moduleDetailsController.deleteModuleDetails,
);
export default moduleDetailsRouter;
