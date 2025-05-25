import { Router } from "express";
import { purchaseValidation } from "./purchase.validation";
import validateRequest from "../../middlewares/validateRequest";
import { purchaseController } from "./purcahase.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const purchaseRoute = Router();
purchaseRoute.get('/stats', authUser(), 
// onlyAdminAndFacultyAndStudent("admin", "superAdmin"),
 purchaseController.getPurchaseStats)
purchaseRoute.post(
  "/create-purchase",
  validateRequest(purchaseValidation.createPurchaseSchema),
  purchaseController.createPurchase,
);
purchaseRoute.get("/", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , purchaseController.getAllPurchase);
purchaseRoute.patch(
  "/:id",
  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") ,
  validateRequest(purchaseValidation.updatePurchaseSchema),
  purchaseController.updatePurchase,
);
purchaseRoute.delete("/:id", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , purchaseController.deletePurchase);
export default purchaseRoute;
