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
exports.applicationService = void 0;
const application_model_1 = require("./application.model");
const createApplication = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield application_model_1.ApplicationModel.create(payload);
    return result;
});
const getAllApplications = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield application_model_1.ApplicationModel.find().populate('job')
        .populate({
        path: 'job_seeker',
        populate: { path: 'user' },
    });
    return result;
});
const getSingleApplication = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield application_model_1.ApplicationModel.findOne({ _id }).populate('job')
        .populate({
        path: 'job_seeker',
        populate: { path: 'user' },
    });
    return result;
});
const updateApplication = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield application_model_1.ApplicationModel.findOneAndUpdate({ _id }, payload, { new: true });
    return result;
});
const deleteApplication = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield application_model_1.ApplicationModel.findOneAndDelete({ _id });
    return result;
});
exports.applicationService = {
    createApplication,
    getAllApplications,
    getSingleApplication,
    updateApplication,
    deleteApplication,
};
