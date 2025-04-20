import { Router } from "express";
import { mcqAttempController } from "./mcqAttemp.controller";
import validateRequest from "../../middlewares/validateRequest";
import { mcqAttemptSchema } from "./mcqAttemp.validation";


const mcqAttempRouter = Router();
mcqAttempRouter.post('/submit', validateRequest(mcqAttemptSchema), mcqAttempController.submitMcqAttemptController);
export default mcqAttempRouter;