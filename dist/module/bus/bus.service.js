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
exports.busService = void 0;
const bus_model_1 = require("./bus.model");
const createBusIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bus_model_1.busModel.create(payload);
    return result;
});
const getAllBusDataFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bus_model_1.busModel.find();
    return result;
});
const updateBusDataInDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bus_model_1.busModel.findOneAndUpdate({ _id }, payload, { new: true });
    return result;
});
const deleteBusDataFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bus_model_1.busModel.findOneAndDelete({ _id });
    return result;
});
const getSingleBusDataFromDBById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bus_model_1.busModel.findOne({ _id });
    return result;
});
exports.busService = {
    createBusIntoDB,
    getAllBusDataFromDB,
    updateBusDataInDB,
    deleteBusDataFromDB,
    getSingleBusDataFromDBById,
};
