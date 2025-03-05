import { Router } from "express";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { globalErrorHandler } from "../../middlewares/globalErrorHandler";
import { UserSchemaValidation } from "../user/user.validation";

const authRouter = Router();

authRouter.post('/register', validateRequest(UserSchemaValidation), AuthControllers.register);
authRouter.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.login);

authRouter.use(globalErrorHandler);

export default authRouter;