import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userController } from "./user.controller";
import { auth, authUser, onlyAdmin, onlyAdminAndFacultyAndStudent, onlyStudent } from "../../middlewares/auth";
import { facultyValidation } from "../teacher/faculty.validation";
import { studentValidation } from "../student/student.validation";
import { adminValidation } from "../admin/admin.validation";
import { changePasswordValidation } from "./user.validation";
import { shopManagerValidation } from "../accountent/accountent.validation";

const userRouter = Router();

// userRouter.post('/create-admin', userController.createAdmin);
userRouter.post(
  "/create-student",
  authUser(),onlyAdminAndFacultyAndStudent("admin","superAdmin"),
  validateRequest(studentValidation.createStudentSchema),
  userController.createStudeent,
);
userRouter.post(
  "/create-admin",
    authUser(),onlyAdminAndFacultyAndStudent("superAdmin"),
  validateRequest(adminValidation.createAdminValidationSchema),
  userController.createAdmin,
);

userRouter.post(
  "/create-manager",
   authUser(),onlyAdminAndFacultyAndStudent("admin","superAdmin"),
  validateRequest(shopManagerValidation.createShopManagerValidationSchema),
  userController.createShopManager,
);
userRouter.get(
  "/profile",
  authUser(),onlyAdminAndFacultyAndStudent("admin","teacher","student","superAdmin", "shopManager"),
  userController.getProfile,
);
userRouter.post(
  "/create-faculty",
     authUser(),onlyAdminAndFacultyAndStudent("admin","superAdmin"),
  validateRequest(facultyValidation.createFacultyValidationSchema),
  userController.createFaculty,
);
userRouter.get("/",    authUser(),onlyAdminAndFacultyAndStudent("admin","superAdmin"), userController.getAllUsers);
userRouter.delete("/", auth.authUser(),onlyAdmin("superAdmin"), userController.deleteUsers);
userRouter.patch(
  "/change-password", authUser(), onlyAdminAndFacultyAndStudent("student", "teacher", "admin", "superAdmin", "shopManager"),
  validateRequest(changePasswordValidation),
  userController.changePassord,
);

export default userRouter;
