import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { offlineBatchValidation } from "./offlineBatch.validation";
import { offlineBatchController } from "./offLineBatch.controller";

const offlineBatchRouter = Router();
offlineBatchRouter.post(
  "/create-offline-batch",
  validateRequest(offlineBatchValidation.createOfflineBatchSchema),
  offlineBatchController.createOfflineBatch,
);
offlineBatchRouter.get("/", offlineBatchController.getAllOfflineBatch);
offlineBatchRouter.patch(
  "/:slug",
  validateRequest(offlineBatchValidation.updateOfflineBatchSchema),
  offlineBatchController.updateOfflineBatch,
);
offlineBatchRouter.delete("/:slug", offlineBatchController.deleteOfflineBatch);
offlineBatchRouter.get("/:slug", offlineBatchController.getSingleOfflineBatch);
export default offlineBatchRouter;
