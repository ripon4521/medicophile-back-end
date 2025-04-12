"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const newEnrollment_validation_1 = require("./newEnrollment.validation");
const newEnrollment_controller_1 = require("./newEnrollment.controller");
const auth_1 = require("../../middlewares/auth");
const enrollmentRoute = (0, express_1.Router)();
enrollmentRoute.post("/createe-enrollment", (0, validateRequest_1.default)(newEnrollment_validation_1.enrolemntValidation.createEnrollmentSchema), newEnrollment_controller_1.enrollmentControlleer.createEnrollment);
enrollmentRoute.get("/", auth_1.auth.authUser("admin"), newEnrollment_controller_1.enrollmentControlleer.getEnrollment);
enrollmentRoute.get("/:id", newEnrollment_controller_1.enrollmentControlleer.getSingleEnrollment);
enrollmentRoute.delete("/:id", newEnrollment_controller_1.enrollmentControlleer.deleteEnrollment);
enrollmentRoute.patch("/:id", (0, validateRequest_1.default)(newEnrollment_validation_1.enrolemntValidation.updateEnrollmentSchema), newEnrollment_controller_1.enrollmentControlleer.updateEnrollment);
exports.default = enrollmentRoute;
