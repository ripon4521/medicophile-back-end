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
exports.courseDetailsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const course_model_1 = __importDefault(require("../course/course.model"));
const courseDetails_model_1 = __importDefault(require("./courseDetails.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const createCourseDetails = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.findOne({
        _id: payload.courseId,
        isDeleted: false,
    });
    const exist = yield courseDetails_model_1.default.findOne({
        courseId: payload.courseId,
    });
    if (!course) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Not Found Course");
    }
    if (exist) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Already exists in database");
    }
    const result = yield courseDetails_model_1.default.create(payload);
    return result;
});
const getAllCourseDetails = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(courseDetails_model_1.default, query)
        .search(["syllabus"])
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
            path: "instructors",
            select: "name role phone profile_picture",
        },
    ]);
    const result = yield courseQuery.exec();
    return result;
});
const updateCourseDetails = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Update operation
    const update = yield courseDetails_model_1.default.findOneAndUpdate({ _id }, payload, {
        new: true,
        runValidators: true,
    });
    if (!update) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update Course Details. ");
    }
    return update;
});
const getSingleCourseDetails = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield courseDetails_model_1.default.findOne({ courseId })
        .populate("courseId")
        .populate("instructors");
    return result;
});
const deleteCourseDetails = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield courseDetails_model_1.default.findOneAndDelete({ _id });
    return result;
});
exports.courseDetailsService = {
    createCourseDetails,
    updateCourseDetails,
    deleteCourseDetails,
    getAllCourseDetails,
    getSingleCourseDetails,
};
