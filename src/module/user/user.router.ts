import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { studentsValidation } from '../student/student.validation'
import { userController } from './user.controller'
import { facultysValidation } from '../faculty/faculty.validation'
import { canteenstaffValidation } from '../canteenstaff/canteenstaff.validation'

const userRouter = Router()

userRouter.post('/create-student', validateRequest(studentsValidation.createStudentValidationSchema), userController.createStudeent);
userRouter.post('/create-faculty', validateRequest(facultysValidation.createFacultyValidationSchema), userController.createFaculty);
userRouter.post('/create-canteen-staff', validateRequest(canteenstaffValidation.createcanteenstaffValidationSchema), userController.createCanteenStaff);
userRouter.get('/', userController.getAllUsers);
userRouter.delete('/', userController.deleteUsers)



export default userRouter;
