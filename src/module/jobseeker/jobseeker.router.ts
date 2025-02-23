import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { jobSeekerValidation } from "./jobseeker.validation";
import { jobSeekerController } from "./jobseeker.controller";


const jobSeekerRouter = Router();

jobSeekerRouter.post('/create-jobSeeker', validateRequest(jobSeekerValidation.createJobSeeker), jobSeekerController.createJobSeeker);
jobSeekerRouter.get('/', jobSeekerController.getJobSeeker);
jobSeekerRouter.get('/:id', jobSeekerController.getSingleJobSeeker);
jobSeekerRouter.patch('/:id', validateRequest(jobSeekerValidation.updateJobSeeker), jobSeekerController.updateJobSeeker);
jobSeekerRouter.delete('/:id', jobSeekerController.deleteJobSeeker);

export default jobSeekerRouter;