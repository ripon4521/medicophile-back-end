"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_validation_1 = require("./student.validation");
const studentRoute = express_1.default.Router();
studentRoute.get('/', student_controller_1.studentsController.getAllStudents);
studentRoute.get('/:id', student_controller_1.studentsController.getSingleStudent);
studentRoute.patch('/:id', (0, validateRequest_1.default)(student_validation_1.studentsValidation.updateStudentValidationSchema), student_controller_1.studentsController.updatedStudent);
studentRoute.delete("/:id", student_controller_1.studentsController.deleteStudent);
exports.default = studentRoute;
