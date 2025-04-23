import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { lectureValidation } from "./lecture.validation";
import { lectureController } from "./lecture.controller";

const lectureRouter = Router();
lectureRouter.post(
  "/create-lecture",
  validateRequest(lectureValidation.createLectureSchema),
  lectureController.createLecture,
);
lectureRouter.patch(
  "/:slug",
  validateRequest(lectureValidation.updateLectureSchema),
  lectureController.updateLecture,
);
lectureRouter.get("/single-lecture/:slug", lectureController.getSingleLecture);
lectureRouter.get("/", lectureController.getLecture);
lectureRouter.get("/:id", lectureController.getSpeecificLecture);


lectureRouter.delete("/:slug", lectureController.deleteLecture);

export default lectureRouter;
