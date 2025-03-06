import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'

import { studentsValidation } from '../student/student.validation'
import { userController } from './user.controller'
import auth from '../../middlewares/auth'

const userRouter = Router()

userRouter.post('/create-student', validateRequest(studentsValidation.createStudentValidationSchema), userController.createStudeent);
userRouter.get('/profile', auth(), userController.getProfile);
userRouter.get('/', userController.getAllUsers);
userRouter.delete('/', userController.deleteUsers)



export default userRouter;
