import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { facultysController } from "./faculty.controller";
import { facultyValidation } from "./faculty.validation";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";
// import { facultysValidation } from './faculty.validation';

const facultRoute = express.Router();
facultRoute.get("/", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , facultysController.getAllFaculty);
facultRoute.get("/:id", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , facultysController.getSingleFaculty);
facultRoute.patch(
  "/update-faculty/:id",
  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") ,
  validateRequest(facultyValidation.updateFacultyValidationSchema),
  facultysController.updatedFaculty,
);
facultRoute.delete("/delete-faculty/:id",  authUser(), onlyAdminAndFacultyAndStudent( "superAdmin") , facultysController.deleteFaculty);

export default facultRoute;
