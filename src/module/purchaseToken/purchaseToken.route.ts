import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { purchaseTokenValidation } from "./purchaseToken.validation";
import { purchaseTokenCOntroller } from "./purchaseToken.controller";


const purchaseTokenRoute = Router();
purchaseTokenRoute.post('/cretae-purchasetoken', validateRequest(purchaseTokenValidation.createPurchaseTokenSchema), purchaseTokenCOntroller.createPurchaseToken);
purchaseTokenRoute.get('/', purchaseTokenCOntroller.getAllPurchaseToken);
purchaseTokenRoute.delete('/delete-purchaetoken', purchaseTokenCOntroller.deletePurchaseToken);
purchaseTokenRoute.patch('/update-purchasetoken', validateRequest(purchaseTokenValidation.updatePurchaseTokenSchema), purchaseTokenCOntroller.updatePurchaseToken);
export default purchaseTokenRoute;