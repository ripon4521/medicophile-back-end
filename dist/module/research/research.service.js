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
exports.researchService = void 0;
const research_model_1 = __importDefault(require("./research.model"));
const createResearchIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield research_model_1.default.create(payload);
    return result;
});
const getAllResearch = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield research_model_1.default.find();
    return result;
});
const getResearchById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield research_model_1.default.findOne({ _id });
    return result;
});
const updateResearchById = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const researchStudent = yield research_model_1.default.findByIdAndUpdate(_id, payload, {
            new: true,
            runValidators: true,
        });
        if (!researchStudent) {
            throw new Error("researchStudent not found");
        }
        return researchStudent;
    }
    catch (error) {
        throw new Error(`Transaction failed:`);
    }
});
const deleteResearchById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Faculty ke find kore check kora
        const research = yield research_model_1.default.findOne({ _id });
        if (!research) {
            throw new Error("research not found");
        }
        return { message: "research and associated user deleted successfully" };
    }
    catch (error) {
        throw new Error(`research failed:`);
    }
});
exports.researchService = {
    createResearchIntoDB,
    getAllResearch,
    getResearchById,
    updateResearchById,
    deleteResearchById,
};
