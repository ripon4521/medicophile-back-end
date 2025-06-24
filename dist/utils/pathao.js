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
exports.getPathaoToken = exports.STORE_ID = void 0;
const axios_1 = __importDefault(require("axios"));
exports.STORE_ID = "264465";
const CLIENT_ID = "7N1aMJQbWm";
const CLIENT_SECRET = "wRcaibZkUdSNz2EI9ZyuXLlNrnAv0TdPUPXMnD39";
const USERNAME = "test@pathao.com"; // Sandbox credentials
const PASSWORD = "lovePathao"; // Sandbox credentials
let accessToken = "";
let tokenExpiry = 0;
const getPathaoToken = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (accessToken && Date.now() < tokenExpiry) {
            return accessToken;
        }
        const response = yield axios_1.default.post("https://courier-api-sandbox.pathao.com/aladdin/api/v1/issue-token", {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: "password",
            username: USERNAME,
            password: PASSWORD,
        }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        if (!response.data || !response.data.access_token) {
            throw new Error("Failed to get token from Pathao");
        }
        accessToken = response.data.access_token;
        tokenExpiry = Date.now() + 3600 * 1000;
        return accessToken;
    }
    catch (error) {
        console.error("Error fetching Pathao token:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw new Error("Could not fetch Pathao token");
    }
});
exports.getPathaoToken = getPathaoToken;
