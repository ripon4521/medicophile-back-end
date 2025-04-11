import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { gapAnswerValidation } from "./gapAnswer.validation";
import { gapAnswerControlller } from "./gapAnswer.controller";

const gapAnswerRoute = Router();
gapAnswerRoute.post(
  "/create-gapanswer",
  validateRequest(gapAnswerValidation.createGapAnswerSchema),
  gapAnswerControlller.createGapAnswer,
);
gapAnswerRoute.get("/", gapAnswerControlller.getAllGapAnswer);
gapAnswerRoute.patch(
  "/update-gapanswer",
  validateRequest(gapAnswerValidation.updateGapAnswerSchema),
  gapAnswerControlller.updateGapAsnser,
);
gapAnswerRoute.delete(
  "/delete-gapanswer",
  gapAnswerControlller.deleteGapAnswer,
);
export default gapAnswerRoute;
