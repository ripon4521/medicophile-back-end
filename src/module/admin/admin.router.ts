import { Router } from 'express'
// import validateRequest from '../../middlewares/validateRequest'

import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constants'
import { adminController } from './admin.controller'

const adminRouter = Router()

adminRouter.patch('/users/:userId/block', auth(USER_ROLE.admin),  adminController.userBlockByAdmin)
adminRouter.delete('/blogs/:id', auth(USER_ROLE.admin),  adminController.deleteBlogByAdmin)

export default adminRouter

// /api/admin/users/:userId/block
// /api/admin/blogs/:id