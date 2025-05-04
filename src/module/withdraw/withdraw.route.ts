import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { withdrawValidation } from "./withdraw.validation";
import { withdrawController } from "./withdraw.controller";

const referWithdrawRouter = Router();
referWithdrawRouter.post('/create-withdraw', validateRequest(withdrawValidation.createReferralWithdrawalZodSchema), withdrawController.createReferWithdraw);
referWithdrawRouter.get('/', withdrawController.getAllReferWithdraw);
referWithdrawRouter.get('/:id', withdrawController.getSingleReferWithdraw);
referWithdrawRouter.patch('/:id',validateRequest(withdrawValidation.updateReferralWithdrawalZodSchema),  withdrawController.updateReferWithdraw);
referWithdrawRouter.delete('/:id', withdrawController.deleteReferWithdraw);
export default referWithdrawRouter;
