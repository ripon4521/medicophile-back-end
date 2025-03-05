import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'

import { studentsValidation } from '../student/student.validation'
import { userController } from './user.controller'

const userRouter = Router()

userRouter.post('/create-student', validateRequest(studentsValidation.createStudentValidationSchema), userController.createStudeent);
userRouter.get('/', userController.getAllUsers);
userRouter.delete('/', userController.deleteUsers)



export default userRouter;
