import express from "express";
import { studentsController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidation } from "./student.validation";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const studentRoute = express.Router();
studentRoute.get("/", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , studentsController.getAllStudents);
studentRoute.get("/:id", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , studentsController.getSingleStudent);
studentRoute.delete("/delete-student", authUser(), onlyAdminAndFacultyAndStudent("superAdmin") , studentsController.deleteStudent);
studentRoute.patch(
  "/update-student",
  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") ,
  validateRequest(studentValidation.updateStudentSchema),
  studentsController.updateStudent,
);

export default studentRoute;
