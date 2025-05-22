import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userController } from "./user.controller";
import { auth, authUser, onlyAdmin, onlyAdminAndFacultyAndStudent, onlyStudent } from "../../middlewares/auth";
import { facultyValidation } from "../teacher/faculty.validation";
import { studentValidation } from "../student/student.validation";
import { adminValidation } from "../admin/admin.validation";
import { changePasswordValidation } from "./user.validation";

const userRouter = Router();

// userRouter.post('/create-admin', userController.createAdmin);
userRouter.post(
  "/create-student",
  validateRequest(studentValidation.createStudentSchema),
  userController.createStudeent,
);
userRouter.post(
  "/create-admin",
  validateRequest(adminValidation.createAdminValidationSchema),
  userController.createAdmin,
);
userRouter.get(
  "/profile",
  auth.authUser("superAdmin", "admin", "teacher", "student"),onlyAdminAndFacultyAndStudent("admin","teacher","student","superAdmin"),
  userController.getProfile,
);
userRouter.post(
  "/create-faculty",
  validateRequest(facultyValidation.createFacultyValidationSchema),
  userController.createFaculty,
);
userRouter.get("/",authUser(), onlyAdminAndFacultyAndStudent("admin"), userController.getAllUsers);
userRouter.delete("/", auth.authUser(),onlyAdmin("admin"), userController.deleteUsers);
userRouter.patch(
  "/change-password", authUser(), onlyAdminAndFacultyAndStudent("student"),
  validateRequest(changePasswordValidation),
  userController.changePassord,
);

export default userRouter;
