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
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseService = void 0;
const course_model_1 = require("./course.model");
const createCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseModel.create(payload);
    return result;
});
const getAllCoursesFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseModel.find();
    return result;
});
const getCourseById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseModel.findOne({ _id });
    return result;
});
const updateCourseInDb = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseModel.findOneAndUpdate({ _id }, payload, { new: true });
    return result;
});
const deleteCourseFromDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseModel.findOneAndDelete({ _id });
    return result;
});
exports.courseService = {
    createCourseIntoDb,
    getAllCoursesFromDb,
    getCourseById,
    updateCourseInDb,
    deleteCourseFromDb,
};
