"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const attendence_validation_1 = require("./attendence.validation");
const attendence_controller_1 = require("./attendence.controller");
const attendanceRoute = (0, express_1.Router)();
attendanceRoute.post("/create-attendance", (0, validateRequest_1.default)(attendence_validation_1.AttendenceSchema), attendence_controller_1.attendenceController.createAttendence);
attendanceRoute.get("/", attendence_controller_1.attendenceController.getAllAttendance);
attendanceRoute.delete("/:id", attendence_controller_1.attendenceController.deleteAttendance);
attendanceRoute.get("/:id", attendence_controller_1.attendenceController.singleAttendance);
exports.default = attendanceRoute;
