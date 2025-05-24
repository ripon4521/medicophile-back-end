import { Router } from "express";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { globalErrorHandler } from "../../middlewares/globalErrorHandler";
import { authUser } from "../../middlewares/auth";

const authRouter = Router();

authRouter.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);
authRouter.post("/admin-login", validateRequest(AuthValidation.loginValidationSchema), AuthControllers.adminlogin)

authRouter.post(
  "/reset-password",
  validateRequest(AuthValidation.resetValidationSchema),
  AuthControllers.resetPassword,
);

authRouter.patch("/logout", AuthControllers.logout);
authRouter.post("/refresh-token", AuthControllers.refreshToken);

authRouter.use(globalErrorHandler);

export default authRouter;
