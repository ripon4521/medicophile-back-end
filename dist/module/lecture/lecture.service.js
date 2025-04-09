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
exports.lectureServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const lecture_model_1 = __importDefault(require("./lecture.model"));
const createLecture = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const create = yield lecture_model_1.default.create(payload);
    if (!create) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faled to create, PLease try again");
    }
    return create;
});
const updateLecture = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield lecture_model_1.default.findOneAndUpdate({ slug }, payload, {
            new: true,
            runValidators: true,
        });
        if (!update) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Lecture not found or update failed.");
        }
        return update;
    }
    catch (error) {
        console.error("Update Lecture Error:", error);
        throw error;
    }
});
const deleteLecture = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield lecture_model_1.default.findOneAndUpdate({ slug }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
    }, { new: true });
    if (!deleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete, please relaod or go back and try again");
    }
    return deleted;
});
const getAllLecture = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lecture_model_1.default.find({ isDeleted: false })
        .populate("createdBy")
        .populate({
        path: "courseId",
        populate: { path: "category" },
    })
        .populate('moduleId');
    return result;
});
const getSingleLecture = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lecture_model_1.default.findOne({ slug })
        .populate("createdBy")
        .populate({
        path: "courseId",
        populate: { path: "category" },
    })
        .populate('moduleId');
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Slug is not valid, Please reload or go back and try again ");
    }
    return result;
});
exports.lectureServices = {
    createLecture,
    updateLecture,
    deleteLecture,
    getAllLecture,
    getSingleLecture,
};
