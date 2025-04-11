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
exports.gapAttempService = void 0;
const gapAttemp_model_1 = __importDefault(require("./gapAttemp.model"));
const getAllGapAttemp = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gapAttemp_model_1.default.find({ isDeleted: false });
    return result;
});
const getSpecificUserGapsAttempMark = (studentId, examId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gapAttemp_model_1.default.find({
        studentId,
        examId,
        isDeleted: false,
    });
    // Check what data you're getting
    console.log("Result:", result);
    const totalScore = result.reduce((sum, attempt) => {
        return (sum +
            (typeof attempt.score === "number"
                ? attempt.score
                : parseFloat(attempt.score || "0")));
    }, 0);
    console.log("Total Score:", totalScore);
    return {
        totalScore,
    };
});
exports.gapAttempService = {
    getAllGapAttemp,
    getSpecificUserGapsAttempMark,
};
