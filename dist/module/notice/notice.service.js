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
exports.noticeServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const notice_model_1 = __importDefault(require("./notice.model"));
const server_1 = require("../../server");
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const createNotice = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_model_1.default.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to create notice. Please try again");
    }
    server_1.io.emit("newNotice", {
        message: "A new notice has been posted",
        notice: result,
    });
    return result;
});
const getAllNoticeFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(notice_model_1.default, query)
        .search(["title", "message"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate({
        path: "createdBy",
        select: "name email phone profile_picture role",
    });
    const result = yield courseQuery.exec();
    return result;
});
const getSingleNotice = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_model_1.default.findOne({ slug }).populate({
        path: "createdBy",
        select: "name email phone profile_picture role",
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faled to get notice, PLease try again");
    }
    return result;
});
const deleteNotice = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_model_1.default.findOneAndUpdate({ slug }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faled to delete notice, PLease try again");
    }
    return result;
});
const updateNotice = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_model_1.default.findOneAndUpdate({ slug }, payload, {
        runValidators: true,
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faled to update notice, PLease try again");
    }
    // Optional: Emit event
    server_1.io.emit("noticeUpdated", {
        message: "A notice has been updated",
        notice: result,
    });
    return result;
});
exports.noticeServices = {
    createNotice,
    updateNotice,
    deleteNotice,
    getAllNoticeFromDb,
    getSingleNotice,
};
