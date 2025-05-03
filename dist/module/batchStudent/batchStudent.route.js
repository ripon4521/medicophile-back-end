"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const batchStudent_validation_1 = require("./batchStudent.validation");
const batchStudent_controller_1 = require("./batchStudent.controller");
const batchStudentRoute = (0, express_1.Router)();
batchStudentRoute.post('/create-batch-student', (0, validateRequest_1.default)(batchStudent_validation_1.batchStudentValidation.createBatchStudentSchema), batchStudent_controller_1.batchStuentController.createBatchStudent);
batchStudentRoute.get('/', batchStudent_controller_1.batchStuentController.getAllBatchStudent);
batchStudentRoute.get('/:id', batchStudent_controller_1.batchStuentController.getSingleBatchStduent);
batchStudentRoute.patch('/:id', (0, validateRequest_1.default)(batchStudent_validation_1.batchStudentValidation.updateBatchStudentSchema), batchStudent_controller_1.batchStuentController.updateBacthStudent);
batchStudentRoute.delete('/:id', batchStudent_controller_1.batchStuentController.deleteBatchStudent);
exports.default = batchStudentRoute;
