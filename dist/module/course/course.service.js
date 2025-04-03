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
const createCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.default.create(payload);
    return result;
});
// const getAllCategorieFromDb = async (query: Record<string, unknown>) => {
//     const queryBuilder = new QueryBuilder(CategoriedModel.find(), query);
//     const result = await queryBuilder
//       .search(['name', 'description'])
//       .filter()
//       .sort()
//       .select()
//       .modelQuery.exec(); // Execute the query
//     return result;
//   };
// const getAllCoursesFromDb =async () => {
//     const result = await courseModel.find().populate('category');
//     return result;
// }
const getAllCoursesFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const courseQuery = new querybuilder_1.default(course_model_1.default.find(), query)
        .search(coursee_constant_1.searchableFields)
        .filter()
        .sort();
    const result = yield courseQuery.modelQuery;
    console.log(result);
    return result;
});
const getCourseById = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.default.findOne({ slug }).populate("category");
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
exports.courseService = {
    createCourseIntoDb,
    getAllCoursesFromDb,
    getCourseById,
    updateCourseInDb,
    deleteCourseFromDb,
};
