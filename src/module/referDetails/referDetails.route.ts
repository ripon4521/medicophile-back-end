import { Router } from "express";
import { referDetailsController } from "./referDetails.controller";

const referDetailsRoute = Router();
referDetailsRoute.get("/", referDetailsController.getAllReferDetails);
referDetailsRoute.get("/:id", referDetailsController.getSingleReferDetails);
referDetailsRoute.delete("/:id", referDetailsController.deleteReferDetails);
export default referDetailsRoute;
