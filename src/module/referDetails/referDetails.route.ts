import { Router } from "express";
import { referDetailsController } from "./referDetails.controller";


const referDetailsRoute = Router();
referDetailsRoute.get('/', referDetailsController.getAllReferDetails);
export default referDetailsRoute;