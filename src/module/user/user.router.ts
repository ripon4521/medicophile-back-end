import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { facultyValidation } from "../teacher/faculty.validation";
import { studentValidation } from "../student/student.validation";

const userRouter = Router();

// userRouter.post('/create-admin', userController.createAdmin);
userRouter.post(
  "/create-student",
  validateRequest(studentValidation.createStudentSchema),
  userController.createStudeent,
);
userRouter.get(
  "/profile",
  auth.authUser("superAdmin", "admin", "teacher", "student"),
  userController.getProfile,
);
userRouter.post(
  "/create-faculty",
  validateRequest(facultyValidation.createFacultyValidationSchema),
  userController.createFaculty,
);
userRouter.get("/", auth.authUser('teacher') , userController.getAllUsers);
userRouter.delete("/",  auth.authUser('admin'), userController.deleteUsers);

export default userRouter;
