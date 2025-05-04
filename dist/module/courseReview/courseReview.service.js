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
exports.courseReveiwService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const course_model_1 = __importDefault(require("../course/course.model"));
const courseReview_model_1 = __importDefault(require("./courseReview.model"));
const user_model_1 = require("../user/user.model");
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const createCourseReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.findOne({
        _id: payload.courseId,
        isDeleted: false,
    });
    const user = yield user_model_1.UserModel.findOne({ _id: payload.studentId });
    if (!course) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Not Found Course");
    }
    else if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid student id");
    }
    const result = yield courseReview_model_1.default.create(payload);
    return result;
});
const getAllCourseReveiw = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(courseReview_model_1.default, query)
        .search(["review"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate([
        {
            path: "courseId",
        },
    ])
        .populate([
        {
            path: "studentId",
            select: "name role phone profile_picture",
        },
    ]);
    const result = yield courseQuery.exec();
    return result;
});
const updateCourseReview = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Update operation
    const update = yield courseReview_model_1.default.findOneAndUpdate({ _id }, payload, {
        new: true,
        runValidators: true,
    });
    if (!update) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update Course Reveiw. ");
    }
    return update;
});
const deleteCourseReveiw = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield courseReview_model_1.default.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "PLease Try Again ");
    }
    return result;
});
const getSingleCourseReveiw = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield courseReview_model_1.default.find({ courseId })
        .populate("courseId")
        .populate("studentId");
    return result;
});
exports.courseReveiwService = {
    createCourseReview,
    updateCourseReview,
    deleteCourseReveiw,
    getAllCourseReveiw,
    getSingleCourseReveiw,
};
