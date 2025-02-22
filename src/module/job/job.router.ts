import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { jobValidation } from "./job.validation";
import { jobController } from "./job.controller";


const jobRouter = Router();

jobRouter.post('/create-job', validateRequest(jobValidation.createJob), jobController.createJob);
jobRouter.get('/', jobController.getAllJobs);

export default jobRouter;