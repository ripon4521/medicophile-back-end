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
exports.userCredentialsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const userCredentials_model_1 = require("./userCredentials.model");
const getAllCredentials = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userCredentials_model_1.UserCredentialsModel.find({ isDeleted: false }).populate("studentId");
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get Credentials. Please try again");
    }
    return result;
});
const getSingleCrtedentials = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userCredentials_model_1.UserCredentialsModel.findOne({ _id }).populate("studentId");
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get Credentials. Please try again");
    }
    return result;
});
const deleteMany = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userCredentials_model_1.UserCredentialsModel.deleteMany();
    return result;
});
exports.userCredentialsService = {
    getAllCredentials,
    getSingleCrtedentials,
    deleteMany
};
