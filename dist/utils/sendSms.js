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
exports.sendSMS = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendSMS = (phone, message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = process.env.GREENWEB_API_TOKEN;
    const url = `http://api.greenweb.com.bd/api.php`;
    const payload = {
        token: token,
        to: phone,
        message: message,
    };
    try {
        const response = yield axios_1.default.get(url, { params: payload });
        // console.log("SMS sent response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("SMS sending failed:", ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw new Error("SMS sending failed");
    }
});
exports.sendSMS = sendSMS;
