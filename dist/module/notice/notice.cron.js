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
// src/modules/notice/notice.cron.ts
const node_cron_1 = __importDefault(require("node-cron"));
const notice_model_1 = __importDefault(require("./notice.model"));
// Run once a day at 12:00 AM
node_cron_1.default.schedule("0 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
        const result = yield notice_model_1.default.updateMany({ expiresAt: { $lte: currentDate }, isExpire: false }, { isExpire: true });
        console.log(`🕛 Cron Job Executed - Expired Notices Updated: ${result.modifiedCount}`);
    }
    catch (error) {
        console.error("❌ Cron Job Error:", error);
    }
}));
