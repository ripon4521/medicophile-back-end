import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { purchaseTokenValidation } from "./purchaseToken.validation";
import { purchaseTokenCOntroller } from "./purchaseToken.controller";


const purchaseTokenRoute = Router();
purchaseTokenRoute.post('/cretae-purchasetoken', validateRequest(purchaseTokenValidation.createPurchaseTokenSchema), purchaseTokenCOntroller.createPurchaseToken)
export default purchaseTokenRoute;