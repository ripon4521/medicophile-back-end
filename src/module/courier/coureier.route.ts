import { Router } from "express";
import { pathaoController } from "./courier.controller";


const pathaoRouter = Router();
pathaoRouter.post('/pathao/:orderId', pathaoController.createPathaoOrder );
export default pathaoRouter;