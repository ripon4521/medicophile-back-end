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
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackService = void 0;
const feedback_model_1 = require("./feedback.model");
const createFeedbackIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_model_1.feedbackModel.create(payload);
    return result;
});
const getAllFeedbackFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_model_1.feedbackModel.find().populate('user');
    return result;
});
const getSingleFeedbackFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_model_1.feedbackModel.findOne({ _id }).populate('user');
    return result;
});
const updateFeedbackInDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_model_1.feedbackModel.findOneAndUpdate({ _id }, payload, { new: true });
    return result;
});
const deleteFeedbackFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_model_1.feedbackModel.findOneAndDelete({ _id });
    return result;
});
exports.feedbackService = {
    createFeedbackIntoDB,
    getAllFeedbackFromDB,
    getSingleFeedbackFromDB,
    updateFeedbackInDB,
    deleteFeedbackFromDB,
};
