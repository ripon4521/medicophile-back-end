"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const coupon_validation_1 = require("./coupon.validation");
const coupon_controller_1 = require("./coupon.controller");
const couponRoute = (0, express_1.Router)();
couponRoute.post("/create-coupon", (0, validateRequest_1.default)(coupon_validation_1.couponValidation.createCouponSchema), coupon_controller_1.couponController.createCoupon);
couponRoute.get("/", coupon_controller_1.couponController.getAllCoupon);
couponRoute.patch("/update-coupon", (0, validateRequest_1.default)(coupon_validation_1.couponValidation.updateCouponSchema), coupon_controller_1.couponController.updateCoupon);
couponRoute.delete("/delete-coupon", coupon_controller_1.couponController.deleteCoupon);
exports.default = couponRoute;
