import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { feedbackValidation } from "./feedback.validation";
import { feedbackController } from "./feedback.controller";


const feedbackRouter =  Router();

feedbackRouter.post('/create-feedback',validateRequest(feedbackValidation.createFeedback), feedbackController.createFeedback);
feedbackRouter.get('/create-feedback', feedbackController.getAllFeedback);


export default feedbackRouter;