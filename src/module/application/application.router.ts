import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { applicationValidation } from "./application.validation";
import { applicationController } from "./application.controller";

const applicationRouter = Router();

applicationRouter.post('/create-application', validateRequest(applicationValidation.createApplication), applicationController.cerateApplication);

applicationRouter.get('/', applicationController.getAllApplications);

applicationRouter.get('/:id', applicationController.getSingleApplication);

applicationRouter.patch('/:id', validateRequest(applicationValidation.updateApplication), applicationController.updateApplication);

applicationRouter.delete('/:id', applicationController.deleteApplication);

export default applicationRouter;