import { Router } from "express";
import { pathaoController } from "./courier.controller";


const pathaoRouter = Router();
pathaoRouter.post('/pathao/:orderId', pathaoController.createPathaoOrder );
pathaoRouter.get("/cities-zones", pathaoController.getCitiesWithZones);
export default pathaoRouter;