import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { userController } from './user.controller'
import { auth } from '../../middlewares/auth'
import { studentValidationSchema } from '../student/student.validation'
import { facultysValidation } from '../teacher/faculty.validation'

const userRouter = Router()

// userRouter.post('/create-admin', userController.createAdmin);
userRouter.post('/create-student', validateRequest(studentValidationSchema.createstudentValidationSchema), userController.createStudeent);
userRouter.get('/profile', auth.authUser('student', 'admin', 'faculty'), userController.getProfile);
userRouter.post('/create-faculty', validateRequest(facultysValidation.createFacultyValidationSchema), userController.createFaculty);
userRouter.get('/', userController.getAllUsers);
userRouter.delete('/', userController.deleteUsers)



export default userRouter;
