import { Router } from 'express'
import { userController } from './user.controller'
// import { USER_ROLE } from './user.constants'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'

const userRouter = Router()

userRouter.post('/user-create', validateRequest(UserValidation.userValidationSchema), userController.createUser)
userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)
// userRouter.get('/',auth(USER_ROLE.admin, USER_ROLE.user), userController.getUser)
userRouter.get('/', userController.getUser)

export default userRouter
