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
exports.liveClassService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const liveClass_model_1 = __importDefault(require("./liveClass.model"));
const createLiveClass = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const create = yield liveClass_model_1.default.create(payload);
    if (!create) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faled to create Live Class, PLease try again");
    }
    return create;
});
const getAllLiveClass = () => __awaiter(void 0, void 0, void 0, function* () {
    const get = yield liveClass_model_1.default.find({ isDeleted: false })
        .populate("courseId")
        .populate("createdBy");
    if (!get) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faled to get Live Class, PLease try again");
    }
    return get;
});
const updateLiveClass = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const get = yield liveClass_model_1.default.findOneAndUpdate({ slug }, payload, {
        runValidators: true,
        new: true,
    });
    if (!get) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faled to update Live Class,  PLease reload or back and try again");
    }
    return get;
});
const deleteLiveClass = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const get = yield liveClass_model_1.default.findOneAndUpdate({ slug }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!get) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faled to delete Live Class, PLease try again");
    }
    return get;
});
const singleGetLiveClass = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const get = yield liveClass_model_1.default.findOne({ slug })
        .populate("courseId")
        .populate("createdBy");
    if (!get) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faled to get Live Class, PLease check slug again");
    }
    return get;
});
exports.liveClassService = {
    createLiveClass,
    updateLiveClass,
    deleteLiveClass,
    getAllLiveClass,
    singleGetLiveClass,
};
