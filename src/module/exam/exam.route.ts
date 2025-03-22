import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { examValidation } from "./exam.validation";
import { examController } from "./exam.controller";

const examRouter = Router();
examRouter.post('/create-exam', validateRequest(examValidation.createExamSchema), examController.createExam);
examRouter.get('/', examController.getExam);
examRouter.get('/:id', examController.getSingleExam);
examRouter.delete('/:id', examController.deleteExam);
examRouter.patch('/:id', validateRequest(examValidation.updateExammSchema), examController.updateExam);

export default examRouter;