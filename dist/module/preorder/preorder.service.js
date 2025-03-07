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
exports.preorderService = void 0;
const preorder_model_1 = require("./preorder.model");
const createPreorderIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield preorder_model_1.PreOrderModel.create(payload);
    return result;
});
const getAllPreorders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield preorder_model_1.PreOrderModel.find().populate('user');
    return result;
});
const getPreorderById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield preorder_model_1.PreOrderModel.findOne({ _id }).populate('user');
    return result;
});
const updatePreorderById = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield preorder_model_1.PreOrderModel.findOneAndUpdate({ _id }, payload, { new: true });
    return result;
});
const deletePreorderById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield preorder_model_1.PreOrderModel.findOneAndDelete({ _id });
    return result;
});
exports.preorderService = {
    createPreorderIntoDb,
    getAllPreorders,
    getPreorderById,
    updatePreorderById,
    deletePreorderById,
};
