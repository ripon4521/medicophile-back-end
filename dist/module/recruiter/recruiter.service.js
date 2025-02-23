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
exports.recuirterService = void 0;
const recruiter_model_1 = require("./recruiter.model");
const createRecruiter = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recruiter_model_1.RecruiterModel.create(payload);
    return result;
});
const getRecruiters = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recruiter_model_1.RecruiterModel.find().populate('user');
    return result;
});
const getSingleRecruiter = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recruiter_model_1.RecruiterModel.findOne({ _id }).populate('user');
    return result;
});
const updateRecruiter = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recruiter_model_1.RecruiterModel.findOneAndUpdate({ _id }, payload, { new: true });
    return result;
});
const deleteRecruiter = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recruiter_model_1.RecruiterModel.findOneAndDelete({ _id });
    return result;
});
exports.recuirterService = {
    createRecruiter,
    getRecruiters,
    getSingleRecruiter,
    updateRecruiter,
    deleteRecruiter,
};
