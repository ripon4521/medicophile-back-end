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
exports.studentsController = exports.getStudentStats = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const student_service_1 = require("./student.service");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const student_model_1 = __importDefault(require("./student.model"));
const getAllStudents = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const students = yield student_service_1.studentsService.getAllStudents(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Students Get successfully",
        data: students,
    });
}));
const getSingleStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const student = yield student_service_1.studentsService.getStudentById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Single Student Get successfully",
        data: student,
    });
}));
const deleteStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    if (!_id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide _id");
    }
    const result = yield student_service_1.studentsService.deleteStudentById(_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Student Deleted successfully",
        data: result,
    });
}));
const updateStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    if (!_id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide _id");
    }
    const data = req.body;
    delete data._id;
    const result = yield student_service_1.studentsService.updateStudent(_id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Student & Nested User Updated successfully",
        data: result,
    });
}));
const getStudentStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate, day, month, year } = req.query;
        let matchCondition = {
            isDeleted: false,
        };
        const dayNum = day ? Number(day) : null;
        const monthNum = month ? Number(month) : null;
        const yearNum = year ? Number(year) : null;
        if (startDate && endDate) {
            // Custom date range filter
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            matchCondition.createdAt = { $gte: start, $lte: end };
        }
        else if (dayNum && monthNum && yearNum) {
            // Specific day filter
            const start = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 0, 0, 0));
            const end = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 23, 59, 59, 999));
            matchCondition.createdAt = { $gte: start, $lte: end };
        }
        else if (monthNum && yearNum) {
            // Month + Year filter
            const start = new Date(Date.UTC(yearNum, monthNum - 1, 1, 0, 0, 0));
            // last day of month
            const end = new Date(Date.UTC(yearNum, monthNum, 0, 23, 59, 59, 999));
            matchCondition.createdAt = { $gte: start, $lte: end };
        }
        else if (yearNum) {
            // Year filter
            const start = new Date(Date.UTC(yearNum, 0, 1, 0, 0, 0));
            const end = new Date(Date.UTC(yearNum + 1, 0, 1, 0, 0, 0));
            end.setHours(23, 59, 59, 999);
            matchCondition.createdAt = { $gte: start, $lte: end };
        }
        const students = yield student_model_1.default.find(matchCondition);
        res.status(200).json({
            success: true,
            total: students.length,
            data: students,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error,
        });
    }
});
exports.getStudentStats = getStudentStats;
exports.studentsController = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent,
    getStudentStats: exports.getStudentStats
};
