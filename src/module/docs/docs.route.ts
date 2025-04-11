import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { docsValidation } from "./docs.validation";
import { docsController } from "./docs.controller";

const docsRouter = Router();
docsRouter.post(
  "/create-docs",
  validateRequest(docsValidation.createDocsSchema),
  docsController.createDocs,
);
docsRouter.get("/", docsController.getAllDocs);
docsRouter.get("/:slug", docsController.singleDocs);
docsRouter.patch(
  "/update-docs",
  validateRequest(docsValidation.updateDocsSchema),
  docsController.updateDocs,
);
docsRouter.delete("/delete-docs", docsController.deleteDocs);
export default docsRouter;
