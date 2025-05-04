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
exports.referalLinkService = void 0;
const generateReferLink_model_1 = __importDefault(require("./generateReferLink.model")); // মডেল ইম্পোর্ট
const generateReferralLink = (userId, courseSlug, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create or get existing referral for user and course
        let referral = yield generateReferLink_model_1.default.findOne({ userId, courseId });
        if (!referral) {
            // Referral doesn't exist, create a new one
            referral = new generateReferLink_model_1.default({
                userId,
<<<<<<< HEAD
                courseId,
=======
                courseId
>>>>>>> 893945e (Resolved merge conflicts)
            });
            // Save new referral
            yield referral.save();
        }
        // Return referral link
<<<<<<< HEAD
        return `https://iconadmissionaid.com/course-details/${courseSlug}?courseId=${courseId}?ref=${referral.userId}`;
=======
        return `https://iconadmissionaid.com/course-details/${courseSlug}?ref=${referral.userId}`;
>>>>>>> 893945e (Resolved merge conflicts)
    }
    catch (error) {
        throw new Error(`Error generating referral link: ${error}`);
    }
});
const getReferLink = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield generateReferLink_model_1.default.find();
    return result;
});
exports.referalLinkService = {
    generateReferralLink,
<<<<<<< HEAD
    getReferLink,
=======
    getReferLink
>>>>>>> 893945e (Resolved merge conflicts)
};
