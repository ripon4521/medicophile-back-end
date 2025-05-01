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
exports.orderDetailsService = void 0;
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const orderDetails_model_1 = __importDefault(require("./orderDetails.model"));
const getAllOrderDetailsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(orderDetails_model_1.default, query)
        .search(["name", "address"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate({
        path: "productId",
    });
    const result = yield courseQuery.exec();
    return result;
});
exports.orderDetailsService = {
    getAllOrderDetailsFromDb
};
