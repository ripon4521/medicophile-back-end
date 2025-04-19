import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { couponValidation } from "./coupon.validation";
import { couponController } from "./coupon.controller";

const couponRoute = Router();
couponRoute.post(
  "/create-coupon",
  validateRequest(couponValidation.createCouponSchema ),
  couponController.createCoupon,
);
couponRoute.get("/", couponController.getAllCoupon);
couponRoute.patch(
  "/update-coupon",
  validateRequest(couponValidation.updateCouponSchema),
  couponController.updateCoupon,
);
couponRoute.delete("/delete-coupon", couponController.deleteCoupon);
export default couponRoute;
