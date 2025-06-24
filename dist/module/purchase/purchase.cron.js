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
const node_cron_1 = __importDefault(require("node-cron"));
const date_fns_1 = require("date-fns");
const purchase_model_1 = require("./purchase.model");
// Run every 6 hours
node_cron_1.default.schedule("0 */6 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentBDTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
        const purchases = yield purchase_model_1.PurchaseModel.find({
            isDeleted: false,
            isExpire: false,
        }).populate("courseId");
        for (const purchase of purchases) {
            // Check if courseId is populated properly
            if (typeof purchase.courseId === "object" && "expireTime" in purchase.courseId) {
                const course = purchase.courseId;
                if (!purchase.createdAt || !course.expireTime)
                    continue;
                const match = course.expireTime.match(/(\d+)\s*(day|month|year)s?/i);
                if (!match)
                    continue;
                const value = parseInt(match[1]);
                const unit = match[2].toLowerCase();
                let expiryDate;
                if (unit === "day") {
                    expiryDate = (0, date_fns_1.addDays)(new Date(purchase.createdAt), value);
                }
                else if (unit === "month") {
                    expiryDate = (0, date_fns_1.addMonths)(new Date(purchase.createdAt), value);
                }
                else if (unit === "year") {
                    expiryDate = (0, date_fns_1.addYears)(new Date(purchase.createdAt), value);
                }
                else {
                    continue;
                }
                if ((0, date_fns_1.isAfter)(currentBDTime, expiryDate)) {
                    yield purchase_model_1.PurchaseModel.updateOne({ _id: purchase._id }, { $set: { isExpire: true } });
                    console.log(`✅ Marked expired: ${course.course_title}`);
                }
            }
        }
        console.log("✅ Purchase expiry cron completed.");
    }
    catch (err) {
        console.error("❌ Cron error:", err);
    }
}));
