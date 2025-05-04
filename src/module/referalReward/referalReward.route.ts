import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { referalRewardValidation } from "./referalReward.validation";
import { referRewardController } from "./referalReward.controller";


const referRewardRouter =Router();
referRewardRouter.post('/create-refer-reward', validateRequest(referalRewardValidation.createReferralRewardZodSchema), referRewardController.createReferReward);
referRewardRouter.get('/', referRewardController.getAllReferDetails);
export default referRewardRouter;