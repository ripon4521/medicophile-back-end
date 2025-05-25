import { Router } from "express";
import { shopManagerController } from "./accountent.controller";
import { shopManagerValidation } from "./accountent.validation";
import validateRequest from "../../middlewares/validateRequest";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const shopManagerRouter = Router();
shopManagerRouter.get('/',  authUser(), onlyAdminAndFacultyAndStudent("superAdmin", "admin"), shopManagerController.getAllShopManager);
shopManagerRouter.patch('/:id',  authUser(), onlyAdminAndFacultyAndStudent("superAdmin", "admin"), validateRequest(shopManagerValidation.updateShopManagerValidationSchema), shopManagerController.updateShopMnagaer);
shopManagerRouter.delete('/:id' ,  authUser(), onlyAdminAndFacultyAndStudent("superAdmin"), shopManagerController.deleteShopMnagaer);
shopManagerRouter.get('/:id', shopManagerController.getSingleManager)
export default shopManagerRouter;