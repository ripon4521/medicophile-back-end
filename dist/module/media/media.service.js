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
exports.mediaService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const media_model_1 = __importDefault(require("./media.model"));
const createMedia = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const create = yield media_model_1.default.create(payload);
    if (!create) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faled to create Media, PLease try again");
    }
    return create;
});
const getAllMedia = () => __awaiter(void 0, void 0, void 0, function* () {
    const get = yield media_model_1.default.find({ isDeleted: false }).populate("createdBy");
    if (!get) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faled to get Media, PLease try again");
    }
    return get;
});
const updateMedia = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const get = yield media_model_1.default.findOneAndUpdate({ slug }, payload, {
        runValidators: true,
        new: true,
    });
    if (!get) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faled to update media,  PLease reload or back and try again");
    }
    return get;
});
const deleteMedia = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const get = yield media_model_1.default.findOneAndUpdate({ slug }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!get) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faled to delete Meida, PLease try again");
    }
    return get;
});
const getSingleMedia = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const get = yield media_model_1.default.findOne({ slug }).populate("createdBy");
    if (!get) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Faled to get Live Class, PLease check slug again");
    }
    return get;
});
exports.mediaService = {
    createMedia,
    deleteMedia,
    updateMedia,
    getAllMedia,
    getSingleMedia,
};
