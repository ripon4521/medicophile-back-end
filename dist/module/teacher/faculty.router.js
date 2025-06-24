"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faculty_controller_1 = require("./faculty.controller");
const faculty_validation_1 = require("./faculty.validation");
const auth_1 = require("../../middlewares/auth");
// import { facultysValidation } from './faculty.validation';
const facultRoute = express_1.default.Router();
facultRoute.get("/", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "superAdmin"), faculty_controller_1.facultysController.getAllFaculty);
facultRoute.get("/:id", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "superAdmin"), faculty_controller_1.facultysController.getSingleFaculty);
facultRoute.patch("/update-faculty", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "superAdmin"), (0, validateRequest_1.default)(faculty_validation_1.facultyValidation.updateFacultyValidationSchema), faculty_controller_1.facultysController.updatedFaculty);
facultRoute.delete("/delete-faculty", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("superAdmin"), faculty_controller_1.facultysController.deleteFaculty);
exports.default = facultRoute;
