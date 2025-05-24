import { Router } from "express";
import { paymentDetailsController } from "./paymentDetails.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const paymentDetilsRoute = Router();
paymentDetilsRoute.get("/", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , paymentDetailsController.getAllPamentyDetails);
export default paymentDetilsRoute;
