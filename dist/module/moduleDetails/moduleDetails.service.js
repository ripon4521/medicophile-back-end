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
exports.moduleDetailsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const moduleDetails_model_1 = __importDefault(require("./moduleDetails.model"));
const createModuleDetails = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield moduleDetails_model_1.default.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create module details, please try again");
    }
    return result;
});
const getAllModuleDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield moduleDetails_model_1.default.find()
        .populate("courseId")
        .populate("moduleId")
        .populate("contentId");
    return result;
});
const getSingleModuleDetails = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield moduleDetails_model_1.default.findOne({ _id })
        .populate("courseId")
        .populate("moduleId")
        .populate("contentId");
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Failed to load data , please reload and try again");
    }
    return result;
});
const deleteModuleDetails = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield moduleDetails_model_1.default.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
    }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete data, please reload and try again");
    }
});
const updateModuleDetails = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield moduleDetails_model_1.default.findOneAndUpdate({ _id }, payload, {
        new: true,
        runValidators: true,
    });
    if (!update) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Failed to updated data, reload and check your updated data and try again");
    }
    return update;
});
exports.moduleDetailsService = {
    createModuleDetails,
    getAllModuleDetails,
    getSingleModuleDetails,
    updateModuleDetails,
    deleteModuleDetails,
};
