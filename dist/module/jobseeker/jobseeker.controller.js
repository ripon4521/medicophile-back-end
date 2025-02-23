"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobSeekerController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const jobseeker_service_1 = require("./jobseeker.service");
const http_status_codes_1 = require("http-status-codes");
const createJobSeeker = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield jobseeker_service_1.jobSeekerService.createJobSeeker(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'JobSeeker created successfully',
        data: result,
    });
}));
const getJobSeeker = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield jobseeker_service_1.jobSeekerService.getJobSeeker();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'JobSeeker getting successfully',
        data: result,
    });
}));
const getSingleJobSeeker = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield jobseeker_service_1.jobSeekerService.getSingleJobSeeker(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Single JobSeeker getting successfully',
        data: result,
    });
}));
const updateJobSeeker = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield jobseeker_service_1.jobSeekerService.updateJobSeeker(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'JobSeeker updated successfully',
        data: result,
    });
}));
const deleteJobSeeker = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield jobseeker_service_1.jobSeekerService.deleteJobSeeker(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'JobSeeker deleted successfully',
        data: result,
    });
}));
exports.jobSeekerController = {
    createJobSeeker,
    getJobSeeker,
    updateJobSeeker,
    getSingleJobSeeker,
    deleteJobSeeker,
};
