import { Router } from "express";
import { orderDetailsController } from "./orderDetails.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateOrderDetailsZodSchema } from "./orderDetails.validation";


const orderDetailsRouter = Router();
orderDetailsRouter.get('/', orderDetailsController.getAllOrderDetails);
orderDetailsRouter.patch('/:id', validateRequest(updateOrderDetailsZodSchema), orderDetailsController.updateOrderDetails);
orderDetailsRouter.delete('/:id', orderDetailsController.deleteOrderDetails)
export default orderDetailsRouter;