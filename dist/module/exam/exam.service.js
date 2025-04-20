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
exports.examServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const exam_model_1 = __importDefault(require("./exam.model"));
const modules_model_1 = __importDefault(require("../modules/modules.model"));
const user_model_1 = require("../user/user.model");
const course_model_1 = __importDefault(require("../course/course.model"));
const createExam = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const moduleId = payload.moduleId;
    const createdBy = payload.createdBy;
    const courseId = payload.courseId;
    const module = yield modules_model_1.default.findOne({ _id: moduleId });
    const user = yield user_model_1.UserModel.findOne({ _id: createdBy });
    const course = yield course_model_1.default.findOne({ _id: courseId });
    if (!module) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Module is not avileable. Please provide a valid module id");
    }
    else if (!user || user.role === "student") {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User is not avileable. Please provide a valid user id.only admin and teacer create exam");
    }
    else if (!course) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Course is not avileable. Please provide a valid Course id");
    }
    const result = yield exam_model_1.default.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed To Create Exam, Please cheack and try again");
    }
    return result;
});
const getAllExam = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_model_1.default.find({ isDeleted: false })
        .populate({
        path: "createdBy",
        select: "name role phone",
    })
        .populate({
        path: "courseId",
        select: "cover_photo course_title description duration course_type category daySchedule expireTime price offerPrice status slug",
        populate: { path: "category", select: "title cover_photo" },
    })
        .populate({
        path: "moduleId",
        select: "moduleTitle slug",
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to load data, please try again");
    }
    return result;
});
const getSingleExam = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_model_1.default.findOne({ slug })
        .populate("createdBy")
        .populate({
        path: "courseId",
        populate: { path: "category" },
    });
    console.log(result);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to load data , please try again");
    }
    return result;
});
const updateExam = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield exam_model_1.default.findOneAndUpdate({ slug }, payload, {
            new: true,
            runValidators: true,
        });
        if (!update) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Exam not found or update failed.");
        }
        return update;
    }
    catch (error) {
        console.error("Update Exam Error:", error);
        throw error;
    }
});
const deleteExam = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_model_1.default.findOneAndUpdate({ slug }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
    }, { new: true });
    return result;
});
const getSpcificExam = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_model_1.default.find({ moduleId: id, isDeleted: false })
        .populate("createdBy")
        .populate({
        path: "courseId",
        populate: { path: "category" },
    })
        .populate("moduleId");
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "module id is not valid or not found in database");
    }
    return result;
});
exports.examServices = {
    createExam,
    updateExam,
    deleteExam,
    getAllExam,
    getSingleExam,
    getSpcificExam
};
