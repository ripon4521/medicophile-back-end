import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { recruiterValidation } from "./recruiter.validation";
import { recruiterController } from "./recruiter.controller";


const recruiterRouter = Router();
recruiterRouter.post('/create-recruiter', validateRequest(recruiterValidation.createRecruiter), recruiterController.createRecruiterIntoDB);
recruiterRouter.get('/', recruiterController.getAllRecruiters);
recruiterRouter.get('/:id', recruiterController.getRecruiterById);
recruiterRouter.patch('/:id', recruiterController.updateRecruiterById);
recruiterRouter.delete('/:id', recruiterController.deleteRecruiterById);

export default recruiterRouter;