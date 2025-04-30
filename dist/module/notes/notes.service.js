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
exports.noteService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const notes_model_1 = __importDefault(require("./notes.model"));
const user_model_1 = require("../user/user.model");
const course_model_1 = __importDefault(require("../course/course.model"));
const modules_model_1 = __importDefault(require("../modules/modules.model"));
const createNote = (paload) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.findOne({
        _id: paload.courseId,
        isDeleted: false,
    });
    const useer = yield user_model_1.UserModel.findOne({
        _id: paload.createdBy,
        isDeleted: false,
    });
    const modul = yield modules_model_1.default.findOne({ _id: paload.moduleId });
    if (!course) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Inavlid course id");
    }
    else if (!useer || useer.role === "student") {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Inavlid user id");
    }
    else if (!modul) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Inavlid module id");
    }
    const result = yield notes_model_1.default.create(paload);
    return result;
});
const getAllNotes = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notes_model_1.default.find({ isDeleted: false })
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
    return result;
});
const getSingleNotes = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notes_model_1.default.findOne({ slug })
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
    return result;
});
const updateNote = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield notes_model_1.default.findOneAndUpdate({ slug }, payload, {
        new: true,
        runValidators: true,
    });
    if (!update) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update Notes. Slug is not valid, reload or go back and try again");
    }
    return update;
});
const deleteNote = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notes_model_1.default.findOneAndUpdate({ slug }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
    }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "PLease Try Again ");
    }
    return result;
});
const getSpcificNotes = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notes_model_1.default.find({ moduleId: id, isDeleted: false })
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
exports.noteService = {
    createNote,
    updateNote,
    getAllNotes,
    getSingleNotes,
    deleteNote,
    getSpcificNotes,
};
