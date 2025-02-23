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
exports.jobService = void 0;
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const job_constant_1 = require("./job.constant");
const job_model_1 = require("./job.model");
const createJob = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield job_model_1.JobModel.create(payload);
    return result;
});
const getAllJob = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const jobQuery = new querybuilder_1.default(job_model_1.JobModel.find(), query)
        .search(job_constant_1.searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield jobQuery.modelQuery;
    return result;
});
const getSingleJob = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield job_model_1.JobModel.findOne({ _id });
    return result;
});
const updateJob = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield job_model_1.JobModel.findOneAndUpdate({ _id }, payload, { new: true });
    return result;
});
const deleteJob = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield job_model_1.JobModel.findOneAndDelete({ _id });
    return result;
});
exports.jobService = {
    createJob,
    getAllJob,
    getSingleJob,
    updateJob,
    deleteJob,
};
