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
const exam_model_1 = __importDefault(require("./exam.model"));
node_cron_1.default.schedule("0 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
        const result = yield exam_model_1.default.updateMany({
            validTime: { $lte: currentDate },
            status: "published",
            isDeleted: false,
        }, { status: "drafted" });
        console.log(`🕛 Drafted ${result.modifiedCount} expired exams`);
    }
    catch (error) {
        console.error("❌ Cron Error:", error);
    }
}));
