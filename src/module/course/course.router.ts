import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidation } from "./course.validation";
import { courseController } from "./course.controller";
import { auth, authUser } from "../../middlewares/auth";

const courseRouter = express.Router();
courseRouter.post(
  "/create-course",
  authUser("admin", "teacher","superAdmin"),
  validateRequest(courseValidation.createCourseSchema),
  courseController.createCourse,
);
courseRouter.get("/", authUser("admin", "teacher", "superAdmin","student"), courseController.getAllCourses);
courseRouter.get("/my-course",authUser("student"), courseController.getMyCourse);
courseRouter.get("/:slug", auth.authUser("admin", "teacher", "superAdmin","student"), courseController.getSingleCourse);
courseRouter.patch(
  "/:slug",
  authUser("admin", "teacher", "superAdmin"),
  validateRequest(courseValidation.updateCourseSchema),
  courseController.updateCourse,
);
courseRouter.delete("/:slug", authUser("admin", "superAdmin", "teacher"), courseController.deleteCourse);

export default courseRouter;
