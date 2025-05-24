import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { batchStudentValidation } from "./batchStudent.validation";
import { batchStuentController } from "./batchStudent.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";


const batchStudentRoute = Router();
batchStudentRoute.post('/create-batch-student', authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") ,validateRequest(batchStudentValidation.createBatchStudentSchema), batchStuentController.createBatchStudent);
batchStudentRoute.get('/',  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") ,  batchStuentController.getAllBatchStudent);
batchStudentRoute.get('/:id',  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") ,  batchStuentController.getSingleBatchStduent);
batchStudentRoute.patch('/:id',  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") ,  validateRequest(batchStudentValidation.updateBatchStudentSchema), batchStuentController.updateBacthStudent);
batchStudentRoute.delete('/:id',  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") ,  batchStuentController.deleteBatchStudent);
export default batchStudentRoute;

