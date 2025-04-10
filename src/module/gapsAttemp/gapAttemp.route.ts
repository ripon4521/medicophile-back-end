import { Router } from "express";
import { getAttempController } from "./gapAttemp.controller";

const gapAttempRouter = Router();
gapAttempRouter.get('/', getAttempController.getAllGapAttemp);
export default gapAttempRouter;