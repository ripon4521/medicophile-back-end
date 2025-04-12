import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { mediaValidation } from "./media.validation";
import { mediaController } from "./media.controller";

const mediaRoute = Router();
mediaRoute.post(
  "/create-media",
  validateRequest(mediaValidation.createMediaZodSchema),
  mediaController.createMedia,
);
mediaRoute.get("/", mediaController.getAllMedia);
mediaRoute.get("/:slug", mediaController.getSingleMedia);
mediaRoute.patch(
  "/:slug",
  validateRequest(mediaValidation.updateMediaZodSchema),
  mediaController.updateMedia,
);
mediaRoute.delete("/:slug", mediaController.deleteMedia);
export default mediaRoute;
