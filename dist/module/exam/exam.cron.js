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
// src/modules/exam/exam.cron.ts
const node_cron_1 = __importDefault(require("node-cron"));
const date_fns_1 = require("date-fns");
const exam_model_1 = __importDefault(require("./exam.model"));
// Cron: Every 12 hours (Midnight & Noon BD time)
node_cron_1.default.schedule("0 */12 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDateBD = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
        const publishedExams = yield exam_model_1.default.find({
            status: "published",
            isDeleted: false,
        });
        for (const exam of publishedExams) {
            const { validTime, createdAt } = exam;
            if (!validTime || !createdAt)
                continue;
            const match = validTime.match(/(\d+)\s*(day|month|year)s?/i);
            if (!match)
                continue;
            const amount = parseInt(match[1]);
            const unit = match[2].toLowerCase();
            let expiryDate;
            if (unit === "day") {
                expiryDate = (0, date_fns_1.addDays)(new Date(createdAt), amount);
            }
            else if (unit === "month") {
                expiryDate = (0, date_fns_1.addMonths)(new Date(createdAt), amount);
            }
            else if (unit === "year") {
                expiryDate = (0, date_fns_1.addYears)(new Date(createdAt), amount);
            }
            else {
                continue;
            }
            if ((0, date_fns_1.isAfter)(currentDateBD, expiryDate)) {
                yield exam_model_1.default.updateOne({ _id: exam._id }, { $set: { status: "drafted" } });
                console.log(`📄 Exam "${exam.examTitle || exam._id}" drafted (expired).`);
            }
        }
        console.log("✅ 12-hour exam expiry check complete.");
    }
    catch (error) {
        console.error("❌ Exam Cron Error:", error);
    }
}));
