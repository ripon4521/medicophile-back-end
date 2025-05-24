import { Router } from "express";
import { referDetailsController } from "./referDetails.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const referDetailsRoute = Router();
referDetailsRoute.get("/", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "student") , referDetailsController.getAllReferDetails);
referDetailsRoute.get("/:id", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "student") , referDetailsController.getSingleReferDetails);
referDetailsRoute.delete("/:id", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , referDetailsController.deleteReferDetails);
export default referDetailsRoute;
