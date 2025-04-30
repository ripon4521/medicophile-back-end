import { Router } from "express";
import { paymentDetailsController } from "./paymentDetails.controller";

const paymentDetilsRoute = Router();
paymentDetilsRoute.get("/", paymentDetailsController.getAllPamentyDetails);
export default paymentDetilsRoute;
