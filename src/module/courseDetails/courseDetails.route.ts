import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseDetailsValidation } from "./courseDetails.validation";
import { courseDetailsController } from "./courseDetails.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const courseDetailsRouter = Router();
courseDetailsRouter.post(
  "/create-course-details",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(courseDetailsValidation.createCourseDetailsZodSchema),
  courseDetailsController.createCourseDetails,
);
courseDetailsRouter.patch(
  "/:id",
  validateRequest(courseDetailsValidation.updateCourseDetailsZodSchema),
  courseDetailsController.updateCourseDetails,
);
courseDetailsRouter.delete("/:id",  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") ,  courseDetailsController.deleteCourseDetails);
courseDetailsRouter.get("/", courseDetailsController.getAllCourseDetails);
courseDetailsRouter.get(
  "/:courseId",
  courseDetailsController.getSingleCourseDetails,
);
export default courseDetailsRouter;
