import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { lectureValidation } from "./lecture.validation";
import { lectureController } from "./lecture.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const lectureRouter = Router();
lectureRouter.post(
  "/create-lecture",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(lectureValidation.createLectureSchema),
  lectureController.createLecture,
);
lectureRouter.patch(
  "/:slug",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(lectureValidation.updateLectureSchema),
  lectureController.updateLecture,
);
lectureRouter.get("/single-lecture/:slug", lectureController.getSingleLecture);
lectureRouter.get("/", lectureController.getLecture);
lectureRouter.get("/:id", lectureController.getSpeecificLecture);

lectureRouter.delete("/:slug",  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") ,  lectureController.deleteLecture);

export default lectureRouter;
