import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { cqAttempsValidation } from "./cqAttemp.validation";
import { cqAttempController } from "./cqAttemp.controller";


const cqAttempRouter = Router();
cqAttempRouter.post('/create-cqattemp', validateRequest(cqAttempsValidation.createCqAttemptValidationSchema), cqAttempController.createCqAttemp);
cqAttempRouter.get('/', cqAttempController.getAllCqAttemp);
cqAttempRouter.patch('/update-cqattemp', validateRequest(cqAttempsValidation.updateCqAttemptValidationSchema), cqAttempController.updateCqAttemp);
cqAttempRouter.delete('/delete-cqattemp', cqAttempController.deleteCqAttemp);
export default  cqAttempRouter;