import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { enrolemntValidation } from "./newEnrollment.validation";
import { enrollmentControlleer } from "./newEnrollment.controller";

const enrollmentRoute = Router();
enrollmentRoute.post(
  "/createe-enrollment",
  validateRequest(enrolemntValidation.createEnrollmentSchema),
  enrollmentControlleer.createEnrollment,
);
enrollmentRoute.get("/", enrollmentControlleer.getEnrollment);
enrollmentRoute.get("/:id", enrollmentControlleer.getSingleEnrollment);
enrollmentRoute.delete("/:id", enrollmentControlleer.deleteEnrollment);
enrollmentRoute.patch(
  "/:id",
  validateRequest(enrolemntValidation.updateEnrollmentSchema),
  enrollmentControlleer.updateEnrollment,
);

export default enrollmentRoute;
