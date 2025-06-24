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
exports.tokenService = void 0;
const token_model_1 = __importDefault(require("./token.model"));
const createToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield token_model_1.default.create(payload);
    return result;
});
const getToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield token_model_1.default.findOne({ isExpire: false }).sort({ createdAt: -1 });
    if (!token)
        return null;
    const now = new Date(new Date().getTime() + 6 * 60 * 60 * 1000); // BD time
    const createdAt = token.createdAt; // confirm it's Date
    const diffInMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);
    if (diffInMinutes > 30) {
        return null; // expired
    }
    return token; // valid
});
exports.tokenService = {
    createToken,
    getToken
};
