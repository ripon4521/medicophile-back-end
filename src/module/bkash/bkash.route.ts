import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TokenSchema } from "./token.validation";
import { tokenController } from "./bkash.controller";

const tokenRouter = Router();
tokenRouter.post('/create-token', validateRequest(TokenSchema), tokenController.createToken);
tokenRouter.get('/', tokenController.getToken);
export default tokenRouter;