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
exports.docsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const docs_model_1 = __importDefault(require("./docs.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const cretaeDocs = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield docs_model_1.default.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to create docs. Please check and try again");
    }
    return result;
});
const getAllDocs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(docs_model_1.default, query)
        .search(["title"])
        .paginate();
    const result = yield courseQuery.exec();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get docs. Please check and try again");
    }
    return result;
});
const getSingleDocs = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield docs_model_1.default.findOne({ slug });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to fatched docs. Please check slug and try again");
    }
    return result;
});
const updateDocs = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield docs_model_1.default.findOneAndUpdate({ _id }, payload, {
        runValidators: true,
        new: true
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update docs. Please check id and try again");
    }
    return result;
});
const deleteDocs = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield docs_model_1.default.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000)
    }, {
        new: true
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete docs. Please check id and try again");
    }
    return result;
});
exports.docsService = {
    cretaeDocs,
    updateDocs,
    getAllDocs,
    deleteDocs,
    getSingleDocs
};
