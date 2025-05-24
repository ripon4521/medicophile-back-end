import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { examController } from "./exam.controller";
import { examValidation } from "./exam.validation";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const examRouter = Router();
examRouter.post(
  "/create-exam",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(examValidation.createExamSchema),
  examController.createExam,
);
examRouter.get("/", examController.getExam);
examRouter.get("/:id", examController.getSpeecificExam);
examRouter.get("/single-exam/:slug", examController.getSingleExam);
examRouter.delete("/:slug",  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") ,  examController.deleteExam);
examRouter.patch(
  "/:slug",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(examValidation.updateExamSchema),
  examController.updateExam,
);
examRouter.get("/:examId/students", examController.getStudentsByExamService);

export default examRouter;
