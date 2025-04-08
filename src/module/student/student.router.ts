import express from "express";
import { studentsController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidation } from "./student.validation";


const studentRoute = express.Router();
studentRoute.get("/", studentsController.getAllStudents);
studentRoute.get("/:id", studentsController.getSingleStudent);
studentRoute.delete("/:id", studentsController.deleteStudent);
studentRoute.patch(
  "/:id",
  validateRequest(studentValidation.updateStudentSchema),
  studentsController.updateStudent,
);

export default studentRoute;
