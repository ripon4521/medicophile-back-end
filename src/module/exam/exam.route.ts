import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { examValidation } from "./exam.validation";
import { examController } from "./exam.controller";

const examRouter = Router();
examRouter.post('/create-exam', validateRequest(examValidation.createExamSchema), examController.createExam);
examRouter.get('/', examController.getExam);
examRouter.get('/:slug', examController.getSingleExam);
examRouter.delete('/:slug', examController.deleteExam);
examRouter.patch('/:slug', validateRequest(examValidation.updateExamSchema), examController.updateExam);

export default examRouter;