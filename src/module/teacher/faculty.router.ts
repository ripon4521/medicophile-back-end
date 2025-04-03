import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { facultysController } from "./faculty.controller";
import { facultyValidation } from "./faculty.validation";
// import { facultysValidation } from './faculty.validation';

const facultRoute = express.Router();
facultRoute.get("/", facultysController.getAllFaculty);
facultRoute.get("/:id", facultysController.getSingleFaculty);
facultRoute.patch(
  "/:id",
  validateRequest(facultyValidation.updateFacultyValidationSchema),
  facultysController.updatedFaculty,
);
facultRoute.delete("/:id", facultysController.deleteFaculty);

export default facultRoute;
