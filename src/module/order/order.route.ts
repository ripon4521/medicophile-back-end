import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { orderValidation } from "./order.validation";
import { orderController } from "./order.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const orderRouter = Router();
orderRouter.get(
  "/stats",
  authUser(),
  onlyAdminAndFacultyAndStudent("admin", "superAdmin", "shopManager"), 
  orderController.getOrderStats
);
orderRouter.post(
  "/create-order",
  validateRequest(orderValidation.createOrderZodSchema),
  orderController.createOrder,
);
orderRouter.get("/",  authUser(),
//  onlyAdminAndFacultyAndStudent("admin", "superAdmin", "shopManager", "student") , 
  orderController.getAllOrders);
orderRouter.patch(
  "/:id",
  // authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "shopManager", "student") ,
  validateRequest(orderValidation.updateOrderZodSchema),
  orderController.updateOrder,
);
orderRouter.delete("/:id", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "student") , orderController.deleteOrder);

export default orderRouter;
