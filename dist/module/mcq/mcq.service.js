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
exports.mcqQuestionService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const exam_model_1 = __importDefault(require("../exam/exam.model"));
const user_model_1 = require("../user/user.model");
const mcq_model_1 = __importDefault(require("./mcq.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const createMcq = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exam = yield exam_model_1.default.findOne({ _id: payload.examId });
    const user = yield user_model_1.UserModel.findOne({
        _id: payload.insertBy,
        isDeleted: false,
    });
    if (!exam || exam.examType !== "MCQ") {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid exam id or please check exam type. Only MCQ type exam needed");
    }
    else if (!user || user.role === "student") {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid admin or teacher id.Only teacher and admin can cretae exam");
    }
    payload.questionType = exam.examType;
    payload.positiveMark = exam.positiveMark;
    payload.negetiveMark = exam.negativeMark;
    const result = yield mcq_model_1.default.create(payload);
    return result;
});
const getAllMcq = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(mcq_model_1.default, query)
        .search(["question", "explaination"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate({
        path: "examId",
        select: "examTitle slug examType positiveMark negativeMark status ",
        //   populate:{path:"courseId", select:"course_title description course_type price offerPrice"},
    })
        .populate([
        {
            path: "insertBy",
            select: "name role phone",
        },
    ]);
    const result = yield courseQuery.exec();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed  to get MCQ Question");
    }
    return result;
});
const getSingleMcq = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mcq_model_1.default.findOne({ _id }).populate({
        path: "examId",
        select: "examTitle slug examType positiveMark negativeMark status ",
        //   populate:{path:"courseId", select:"course_title description course_type price offerPrice"},
    })
        .populate([
        {
            path: "insertBy",
            select: "name role phone",
        },
    ]);
    return result;
});
const updateMcq = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const mcq = yield mcq_model_1.default.findOne({ _id: _id });
    if (!mcq) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid mcq id");
    }
    const result = yield mcq_model_1.default.findOneAndUpdate({ _id }, payload, {
        runValidators: true,
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update mcq  question");
    }
    return result;
});
const deleteMcq = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const mcq = yield mcq_model_1.default.findOne({ _id: _id });
    if (!mcq) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid mcq id");
    }
    const result = yield mcq_model_1.default.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete mcq  question");
    }
    return result;
});
const getSpcificMcq = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mcq_model_1.default.find({ examId: id, isDeleted: false })
        .populate("insertBy")
        .populate("examId");
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "exam id is not valid or not found in database");
    }
    return result;
});
exports.mcqQuestionService = {
    createMcq,
    getAllMcq,
    updateMcq,
    deleteMcq,
    getSpcificMcq,
    getSingleMcq
};
