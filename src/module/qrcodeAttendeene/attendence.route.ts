import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AttendenceSchema } from "./attendence.validation";
import { attendenceController } from "./attendence.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const attendanceRoute = Router();
attendanceRoute.post(
  "/create-attendance",
  authUser(), onlyAdminAndFacultyAndStudent("student") ,
  validateRequest(AttendenceSchema),
  attendenceController.createAttendence,
);
attendanceRoute.get("/", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , attendenceController.getAllAttendance);
attendanceRoute.delete("/:id", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , attendenceController.deleteAttendance);
attendanceRoute.get("/:id", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , attendenceController.singleAttendance);
export default attendanceRoute;
