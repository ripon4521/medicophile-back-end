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
const token_model_1 = __importDefault(require("./token.model"));
// Cron runs every 30 minutes (e.g., 12:00, 12:30, 1:00, etc.)
node_cron_1.default.schedule('*/30 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const now = new Date(new Date().getTime() + 6 * 60 * 60 * 1000); // Bangladesh time
        // Find all active (non-expired) tokens
        const tokens = yield token_model_1.default.find({ isExpire: false });
        for (const token of tokens) {
            const createdAt = token.createdAt;
            const diffInMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);
            if (diffInMinutes >= 30) {
                yield token_model_1.default.updateOne({ _id: token._id }, { $set: { isExpire: true } });
                console.log(`⏳ Token "${token.token}" expired at ${now.toISOString()}.`);
            }
        }
        console.log('✅ 30-minute token expiry check completed.');
    }
    catch (error) {
        console.error('❌ Error in token expiry check:', error);
    }
}));
