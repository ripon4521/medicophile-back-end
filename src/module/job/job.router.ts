import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { jobValidation } from "./job.validation";
import { jobController } from "./job.controller";


const jobRouter = Router();

jobRouter.post('/create-job', validateRequest(jobValidation.createJob), jobController.createJob);
jobRouter.get('/', jobController.getAllJobs);
jobRouter.get('/:id', jobController.getJobById);
jobRouter.patch('/:id', validateRequest(jobValidation.updateJob), jobController.updateJob);
jobRouter.delete('/:id', jobController.deleteJob)

export default jobRouter;