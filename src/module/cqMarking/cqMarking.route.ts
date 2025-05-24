import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { cqMarkingContoller } from "./cqMarking.controller";
import { cqMarkingValidation } from "./cqMarking.validation";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const cqMarkingRouter = Router();
cqMarkingRouter.post(
  "/create-cqmarking",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(cqMarkingValidation.createCqMarkingSchema),
  cqMarkingContoller.createCqMarking,
);
cqMarkingRouter.get("/", cqMarkingContoller.getAllCqMarking);
cqMarkingRouter.patch(
  "/update-cqmarking",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(cqMarkingValidation.updateCqMarkingSchema),
  cqMarkingContoller.updateCqMarking,
);
cqMarkingRouter.delete("/delete-cqmarking",  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") ,  cqMarkingContoller.deleteCqMarking);
cqMarkingRouter.get(
  "/get-specificcqmarking",
  cqMarkingContoller.getSpecificCqMarking,
);
export default cqMarkingRouter;
