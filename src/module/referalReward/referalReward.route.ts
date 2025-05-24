import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { referalRewardValidation } from "./referalReward.validation";
import { referRewardController } from "./referalReward.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const referRewardRouter = Router();
referRewardRouter.post(
  "/create-refer-reward",
  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") ,
  validateRequest(referalRewardValidation.createReferralRewardZodSchema),
  referRewardController.createReferReward,
);
referRewardRouter.get("/", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "student") , referRewardController.getAllReferDetails);
referRewardRouter.get("/:id", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "student") , referRewardController.getSingleReferReward);
referRewardRouter.patch(
  "/:id",
  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") ,
  validateRequest(referalRewardValidation.updateReferralRewardZodSchema),
  referRewardController.updateReferReward,
);
referRewardRouter.delete("/:id", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , referRewardController.deleteReferReward);
export default referRewardRouter;
