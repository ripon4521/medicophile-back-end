import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { cqMarkingContoller } from "./cqMarking.controller";
import { cqMarkingValidation } from "./cqMarking.validation";


const cqMarkingRouter = Router();
cqMarkingRouter.post('/create-cqmarking', validateRequest(cqMarkingValidation.createCqMarkingSchema), cqMarkingContoller.createCqMarking);
cqMarkingRouter.get('/', cqMarkingContoller.getAllCqMarking);
cqMarkingRouter.patch('/update-cqmarking', validateRequest(cqMarkingValidation.updateCqMarkingSchema), cqMarkingContoller.updateCqMarking);
cqMarkingRouter.delete('/delete-cqmarking', cqMarkingContoller.deleteCqMarking);
cqMarkingRouter.get('/get-specificcqmarking', cqMarkingContoller.getSpecificCqMarking)
export default cqMarkingRouter;