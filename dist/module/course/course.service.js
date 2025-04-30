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
exports.courseService = void 0;
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const coursee_constant_1 = require("./coursee.constant");
const course_model_1 = __importDefault(require("./course.model"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = require("../user/user.model");
const date_fns_1 = require("date-fns");
const purchase_model_1 = require("../purchase/purchase.model");
const createCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const id = payload.createdBy;
    const user = yield user_model_1.UserModel.findOne({ _id: id });
    if (!user || (user === null || user === void 0 ? void 0 : user.role) === "student") {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User not found. Please provide valid user id. ony admin and teacher is valid");
    }
    const result = yield course_model_1.default.create(payload);
    return result;
});
const getAllCoursesFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const finalQuery = Object.assign(Object.assign({}, query), { status: "active" });
    const courseQuery = new querybuilder_1.default(course_model_1.default, finalQuery)
        .search(coursee_constant_1.searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate({
        path: "category",
        select: "title cover_photo slug",
    })
        .populate([
        {
            path: "createdBy",
            select: "name role phone",
        },
    ]);
    const result = yield courseQuery.exec();
    const currentDateBD = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
    // Filter out expired courses
    const ongoingCourses = result.filter((course) => {
        if (!course.createdAt || !course.duration)
            return false;
        const durationMatch = course.duration.match(/(\d+)\s*months?/i);
        if (!durationMatch)
            return false;
        const months = parseInt(durationMatch[1]);
        const endDate = (0, date_fns_1.addMonths)(new Date(course.createdAt), months);
        return (0, date_fns_1.isAfter)(endDate, currentDateBD);
    });
    return ongoingCourses;
});
const getCourseById = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.default
        .findOne({ slug })
        .populate({
        path: "category",
        select: "title cover_photo slug",
    })
        .populate({
        path: "createdBy",
        select: "name role phone",
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get Course Ctaegory. Slug is not valid, reload or go back and try again");
    }
    return result;
});
const updateCourseInDb = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield course_model_1.default.findOneAndUpdate({ slug }, payload, {
        new: true,
        runValidators: true,
    });
    if (!update) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update Course Ctaegory. Slug is not valid, reload or go back and try again");
    }
    return update;
});
const deleteCourseFromDb = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.default.findOneAndUpdate({ slug }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
    }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "PLease Try Again ");
    }
    return result;
});
const getUserPurchasedCourses = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const purchases = yield purchase_model_1.PurchaseModel.find({
        userId,
        paymentStatus: 'Paid',
        status: 'Active'
    }).populate('courseId');
    // শুধু কোর্স ডেটা রিটার্ন করবো
    return purchases.map(purchase => purchase.courseId);
});
exports.courseService = {
    createCourseIntoDb,
    getAllCoursesFromDb,
    getCourseById,
    updateCourseInDb,
    deleteCourseFromDb,
    getUserPurchasedCourses
};
