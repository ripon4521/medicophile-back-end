import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AttendenceSchema } from "./attendence.validation";
import { attendenceController } from "./attendence.controller";

const attendanceRoute =Router();
attendanceRoute.post('/create-attendance', validateRequest(AttendenceSchema), attendenceController.createAttendence);
attendanceRoute.get('/', attendenceController.getAllAttendance);
attendanceRoute.delete('/:id', attendenceController.deleteAttendance);
attendanceRoute.get('/:id', attendenceController.singleAttendance);
export default attendanceRoute;