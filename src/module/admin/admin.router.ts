import { Router } from 'express'
// import validateRequest from '../../middlewares/validateRequest'

import { adminController } from './admin.controller'

const adminRouter = Router()
/*  auth(USER_ROLE.admin), */
adminRouter.patch('/users/:userId/block',  adminController.userBlockByAdmin)
adminRouter.delete('/blogs/:id', adminController.deleteBlogByAdmin)

/* Overview section handel */
adminRouter.get('/overview', adminController.deleteBlogByAdmin)







export default adminRouter

// /api/admin/users/:userId/block
// /api/admin/blogs/:id