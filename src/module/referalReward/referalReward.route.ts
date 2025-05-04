import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { referalRewardValidation } from "./referalReward.validation";
import { referRewardController } from "./referalReward.controller";


const referRewardRouter =Router();
referRewardRouter.post('/create-refer-reward', validateRequest(referalRewardValidation.createReferralRewardZodSchema), referRewardController.createReferReward);
referRewardRouter.get('/', referRewardController.getAllReferDetails);
referRewardRouter.get('/:id', referRewardController.getSingleReferReward);
referRewardRouter.patch('/:id', validateRequest(referalRewardValidation.updateReferralRewardZodSchema), referRewardController.updateReferReward);
referRewardRouter.delete('/:id', referRewardController.deleteReferReward);
export default referRewardRouter;