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
exports.productService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const bookCategory_model_1 = __importDefault(require("../bookCategory/bookCategory.model"));
const user_model_1 = require("../user/user.model");
const product_model_1 = require("./product.model");
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const createProduct = (paload) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield bookCategory_model_1.default.findOne({
        _id: paload.categoryId,
        isDeleted: false,
    });
    const user = yield user_model_1.UserModel.findOne({
        _id: paload.createdBy,
        isDeleted: false,
    });
    if (!category) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Inavlid category id");
    }
    else if (!user || user.role === "student") {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Inavlid user id. Only admin or teacher can create");
    }
    const result = yield product_model_1.ProductModel.create(paload);
    return result;
});
const getAllProductFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(product_model_1.ProductModel, query)
        .search(["title", "description", "tags"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate({
        path: "categoryId",
        select: "name description slug",
    })
        .populate([
        {
            path: "createdBy",
            select: "name role phone",
        },
    ]);
    const result = yield courseQuery.exec();
    return result;
});
const getSingleProducts = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOne({ slug })
        .populate({
        path: "createdBy",
        select: "name role phone",
    })
        .populate({
        path: "categoryId",
        select: "name description slug",
    });
    return result;
});
const updateProduct = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield product_model_1.ProductModel.findOneAndUpdate({ slug }, payload, {
        new: true,
        runValidators: true,
    });
    if (!update) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update Products. Slug is not valid");
    }
    return update;
});
const deleteProduct = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOneAndUpdate({ slug }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "PLease Try Again ");
    }
    return result;
});
exports.productService = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProductFromDb,
    getSingleProducts,
};
