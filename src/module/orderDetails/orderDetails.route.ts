import { Router } from "express";
import { orderDetailsController } from "./orderDetails.controller";


const orderDetailsRouter = Router();
orderDetailsRouter.get('/', orderDetailsController.getAllOrderDetails);
export default orderDetailsRouter;