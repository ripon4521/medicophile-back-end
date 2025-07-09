import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidation } from "./course.validation";
import { courseController } from "./course.controller";
import { auth, authUser, onlyAdmin, onlyAdminAndFacultyAndStudent, onlyFaculty } from "../../middlewares/auth";

const courseRouter = express.Router();
courseRouter.post(
  "/create-course",
  authUser(),onlyAdminAndFacultyAndStudent("admin","superAdmin"),
  validateRequest(courseValidation.createCourseSchema),
  courseController.createCourse,
);
courseRouter.get("/", courseController.getAllCourses);
courseRouter.get("/my-course", auth.authUser("student","superAdmin"),onlyAdminAndFacultyAndStudent("admin","teacher","student"), courseController.getMyCourse);
courseRouter.get("/:slug", courseController.getSingleCourse);
courseRouter.patch(
  "/:slug",
//  authUser(),onlyAdminAndFacultyAndStudent("admin","superAdmin"),
  validateRequest(courseValidation.updateCourseSchema),
  courseController.updateCourse,
);
courseRouter.delete("/:slug", authUser(),onlyAdminAndFacultyAndStudent("admin","superAdmin"), courseController.deleteCourse);

export default courseRouter;
