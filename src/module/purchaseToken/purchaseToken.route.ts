import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { purchaseTokenValidation } from "./purchaseToken.validation";
import { purchaseTokenCOntroller } from "./purchaseToken.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const purchaseTokenRoute = Router();
purchaseTokenRoute.post(
  "/cretae-purchasetoken",
  validateRequest(purchaseTokenValidation.createPurchaseTokenSchema),
  purchaseTokenCOntroller.createPurchaseToken,
);
purchaseTokenRoute.get("/", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , purchaseTokenCOntroller.getAllPurchaseToken);
purchaseTokenRoute.delete(
  "/delete-purchaetoken",
  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") ,
  purchaseTokenCOntroller.deletePurchaseToken,
);
purchaseTokenRoute.patch(
  "/update-purchasetoken",
  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") ,
  validateRequest(purchaseTokenValidation.updatePurchaseTokenSchema),
  purchaseTokenCOntroller.updatePurchaseToken,
);
export default purchaseTokenRoute;
