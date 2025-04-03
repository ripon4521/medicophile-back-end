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
const lecture_model_1 = __importDefault(require("./lecture.model"));
const createLecture = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const create = yield lecture_model_1.default.create(payload);
    return create;
});
const updateLecture = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield lecture_model_1.default.findOneAndUpdate({ _id }, payload, {
            new: true,
            runValidators: true,
        });
        if (!update) {
            throw new Error("Lecture not found or update failed.");
        }
        return update;
    }
    catch (error) {
        console.error("Update Lecture Error:", error);
        throw error;
    }
});
const deleteLecture = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lecture_model_1.default.findOneAndDelete({ _id });
    return result;
});
const getAllLecture = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lecture_model_1.default.find()
        .populate("createdBy")
        .populate({
        path: "courseId",
        populate: { path: "category" },
    });
    return result;
});
const getSingleLecture = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lecture_model_1.default.findOne({ _id })
        .populate("createdBy")
        .populate({
        path: "courseId",
        populate: { path: "category" },
    });
    return result;
});
exports.lectureServices = {
    createLecture,
    updateLecture,
    deleteLecture,
    getAllLecture,
    getSingleLecture,
};
