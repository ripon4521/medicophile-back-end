import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { orderValidation } from "./order.validation";
import { orderController } from "./order.controller";


const orderRouter = Router();
orderRouter.post('/create-order', validateRequest(orderValidation.createOrderZodSchema), orderController.createOrder);
orderRouter.get('/', orderController.getAllOrders);
export default orderRouter;