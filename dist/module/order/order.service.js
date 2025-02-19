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
exports.OrderServices = exports.createOrderIntoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = require("./order.model");
const product_model_1 = require("../product/product.model");
const stripe = require('stripe')('sk_test_51L1wwjDAYSz72lr1qJ4h8sa7mvvNNFTPGjgMeqoQtnWKYXGT7zONgAmDJAIrYSUtaDu9xroi1FCToiW90FtP4gah00eYkVqyIB');
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession(); // Start transaction
    session.startTransaction();
    try {
        for (const item of payload.products) {
            const product = yield product_model_1.ProductModel.findById(item.product).session(session);
            if (!product) {
                throw new Error(`Product with ID ${item.product} not found`);
            }
            if (product.quantity < item.quantity) {
                throw new Error(`Not enough stock for product ${product.title}`);
            }
            // Deduct quantity from product stock
            product.quantity -= item.quantity;
            yield product.save({ session });
        }
        // Create order after stock is updated
        const result = yield order_model_1.OrderModel.create([payload], { session });
        yield session.commitTransaction(); // Commit transaction
        session.endSession();
        // return result;
    }
    catch (error) {
        yield session.abortTransaction(); // Rollback on failure
        session.endSession();
        throw error;
    }
});
exports.createOrderIntoDB = createOrderIntoDB;
// cehckout 
const CheckoutOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = new order_model_1.OrderModel(payload);
    const stripeBuyPrices = Number(result === null || result === void 0 ? void 0 : result.totalPrice);
    const amount = Number((stripeBuyPrices * 100));
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: amount,
        payment_method_types: ["card"],
        currency: "usd",
    });
    return { paymentIntent, result };
});
// Get all Orders 
const getAlOrdersFromDB = (findData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find(findData).populate('products.product');
    return result;
});
// Get single Order following by id
const getSingleOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.findById({ _id: id });
    return result;
});
// Update a Order by ID
const updateOrderFromDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.findByIdAndUpdate(id, data, { new: true });
    return result;
});
// Delete a ORDER by ID
const deleteOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.findOneAndDelete({ _id: id });
    return result;
});
const getTotalPriceFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalPrice" },
            },
        },
        {
            $project: {
                _id: 0,
                totalRevenue: 1,
            },
        },
    ]);
    return result.length > 0 ? result[0].totalRevenue : 0;
});
//all service is exported from this function
exports.OrderServices = {
    createOrderIntoDB: exports.createOrderIntoDB,
    getAlOrdersFromDB,
    getSingleOrderFromDB,
    updateOrderFromDB,
    deleteOrderFromDB,
    getTotalPriceFromDB,
    CheckoutOrderIntoDB
};
