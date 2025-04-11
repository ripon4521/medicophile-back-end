import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { liveClassValidation } from "./liveClass.validation";
import { liveClassController } from "./liveClass.controller";

const liveClassRouter = Router();
liveClassRouter.post('/create-liveClass', validateRequest(liveClassValidation.createliveClassZodSchema), liveClassController.createLiveClass);
liveClassRouter.get('/', liveClassController.getAllLiveClass);
liveClassRouter.get('/:slug', liveClassController.getSingleLiveClass);
liveClassRouter.patch('/:slug', validateRequest(liveClassValidation.updateliveClassZodSchema), liveClassController.updateLiveClass);
liveClassRouter.delete('/:slug', liveClassController.deleteLiveClass);
export default liveClassRouter;