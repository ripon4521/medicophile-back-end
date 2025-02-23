import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { feedbackValidation } from "./feedback.validation";
import { feedbackController } from "./feedback.controller";


const feedbackRouter =  Router();

feedbackRouter.post('/create-feedback',validateRequest(feedbackValidation.createFeedback), feedbackController.createFeedback);
feedbackRouter.get('/', feedbackController.getAllFeedback);
feedbackRouter.get('/:id', feedbackController.getFeedbackById);
feedbackRouter.patch('/:id', validateRequest(feedbackValidation.updateFeedback), feedbackController.updateFeedback);
feedbackRouter.delete('/:id', feedbackController.deleteFeedback);


export default feedbackRouter;