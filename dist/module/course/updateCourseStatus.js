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
const course_model_1 = __importDefault(require("./course.model"));
// Cron task: Every 12 hours at minute 0 (i.e., 2 AM & 2 PM BD time approx.)
node_cron_1.default.schedule("0 */12 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDateBD = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
        const activeCourses = yield course_model_1.default.find({
            status: "active",
            isDeleted: false,
        });
        for (const course of activeCourses) {
            const { duration, createdAt } = course;
            if (!duration || !createdAt)
                continue;
            const match = duration.match(/(\d+)\s*(day|month|year)s?/i);
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
                continue; // Unknown unit
            }
            if ((0, date_fns_1.isAfter)(currentDateBD, expiryDate)) {
                yield course_model_1.default.updateOne({ _id: course._id }, { $set: { status: "inactive" } });
                console.log(`Course "${course.course_title}" set to inactive (expired).`);
            }
        }
        console.log("12-hour course expiry check complete.");
    }
    catch (error) {
        console.error("Error during course expiry check:", error);
    }
}));
