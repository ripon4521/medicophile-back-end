import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidation } from "./admin.validation";
import { adminController } from "./admin.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";
// import validateRequest from '../../middlewares/validateRequest'


const adminRouter = Router();
/*  auth(USER_ROLE.admin), */
// adminRouter.patch("/users/:userId/block", adminController.userBlockByAdmin);
// adminRouter.delete("/blogs/:id", adminController.deleteBlogByAdmin);

/* Overview section handel */
adminRouter.get('/', authUser(), onlyAdminAndFacultyAndStudent("superAdmin"), adminController.getAllAdmin);
adminRouter.patch('/:id', authUser(), onlyAdminAndFacultyAndStudent("superAdmin"), validateRequest(adminValidation.updateAdminValidationSchema), adminController.updateAdmin)
adminRouter.delete('/:id', authUser(), onlyAdminAndFacultyAndStudent("superAdmin"), adminController.deleteAdmin);
// adminRouter.get("/overview", adminController.deleteBlogByAdmin);

export default adminRouter;

// /api/admin/users/:userId/block
// /api/admin/blogs/:id
