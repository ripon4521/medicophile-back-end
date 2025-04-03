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
const notes_model_1 = __importDefault(require("./notes.model"));
const createNote = (paload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notes_model_1.default.create(paload);
    return result;
});
const getAllNotes = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notes_model_1.default.find()
        .populate("createdBy")
        .populate({
        path: "courseId",
        populate: { path: "category" },
    });
    return result;
});
const getSingleNotes = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notes_model_1.default.findOne({ _id })
        .populate("createdBy")
        .populate({
        path: "courseId",
        populate: { path: "category" },
    });
    return result;
});
const updateNote = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield notes_model_1.default.findOneAndUpdate({ _id }, payload, {
        new: true,
        runValidators: true,
    });
    return update;
});
const deleteNote = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notes_model_1.default.findOneAndDelete({ _id });
    return result;
});
exports.noteService = {
    createNote,
    updateNote,
    getAllNotes,
    getSingleNotes,
    deleteNote,
};
