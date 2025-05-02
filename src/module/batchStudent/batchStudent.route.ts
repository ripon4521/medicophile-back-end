import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { batchStudentValidation } from "./batchStudent.validation";
import { batchStuentController } from "./batchStudent.controller";


const batchStudentRoute = Router();
batchStudentRoute.post('/create-batch-student', validateRequest(batchStudentValidation.createBatchStudentSchema), batchStuentController.createBatchStudent);
batchStudentRoute.get('/',  batchStuentController.getAllBatchStudent);
batchStudentRoute.get('/:id', batchStuentController.getSingleBatchStduent);
batchStudentRoute.patch('/:id', validateRequest(batchStudentValidation.updateBatchStudentSchema), batchStuentController.updateBacthStudent);
batchStudentRoute.delete('/:id', batchStuentController.deleteBatchStudent);
export default batchStudentRoute;