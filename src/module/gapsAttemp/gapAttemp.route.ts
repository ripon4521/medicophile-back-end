import { Router } from "express";
import { getAttempController } from "./gapAttemp.controller";

const gapAttempRouter = Router();
gapAttempRouter.get('/', getAttempController.getAllGapAttemp);
gapAttempRouter.get('/get-specificgapmark', getAttempController.getSpecificUserAttemp)
export default gapAttempRouter;