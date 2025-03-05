"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const courseRouter = express_1.default.Router();
courseRouter.post('/create-course', (0, validateRequest_1.default)(course_validation_1.courseValidation.createCourseSchema), course_controller_1.courseController.createCourse);
courseRouter.get('/', course_controller_1.courseController.getAllCourses);
courseRouter.get('/:id', course_controller_1.courseController.getSingleCourse);
courseRouter.patch('/:id', course_controller_1.courseController.updateCourse);
courseRouter.delete('/:id', course_controller_1.courseController.deleteCourse);
exports.default = courseRouter;
