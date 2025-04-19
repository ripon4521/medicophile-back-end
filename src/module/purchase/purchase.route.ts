import { Router } from "express";
import { purchaseValidation } from "./purchase.validation";
import validateRequest from "../../middlewares/validateRequest";
import { purchaseController } from "./purcahase.controller";

const purchaseRoute = Router();
purchaseRoute.post('/create-purchase',validateRequest( purchaseValidation.createPurchaseSchema), purchaseController.createPurchase);
purchaseRoute.get('/', purchaseController.getAllPurchase)
export default  purchaseRoute;