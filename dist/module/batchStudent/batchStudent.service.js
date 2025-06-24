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
exports.batchStudentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const user_model_1 = require("../user/user.model");
const batchStudent_model_1 = require("./batchStudent.model");
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const course_model_1 = __importDefault(require("../course/course.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const purchaseToken_model_1 = __importDefault(require("../purchaseToken/purchaseToken.model"));
const purchase_model_1 = require("../purchase/purchase.model");
const createBatchStudent = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const user = yield user_model_1.UserModel.findOne({ _id: payload.studentId }).session(session);
        if (!user || user.role !== "student") {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid student ID.");
        }
        const course = yield course_model_1.default.findOne({ _id: payload.courseId }).session(session);
        if (!course) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid course ID.");
        }
        const generatedToken = `PT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        const price = (course === null || course === void 0 ? void 0 : course.price) || 0;
        const discount = (course === null || course === void 0 ? void 0 : course.offerPrice) ? price - course.offerPrice : 0;
        const subtotal = price;
        const charge = 0;
        const totalAmount = subtotal - discount + charge;
        // Create Purchase Token
        const purchaseToken = yield purchaseToken_model_1.default.create([{
                studentId: payload.studentId,
                courseId: payload.courseId,
                status: "Enrolled",
                purchaseToken: generatedToken,
                price,
                subtotal,
                discount,
                charge,
                totalAmount,
                name: user.name,
                phone: user.phone,
            }], { session });
        // Create Purchase
        const purchase = yield purchase_model_1.PurchaseModel.create([{
                studentId: payload.studentId,
                courseId: payload.courseId,
                paymentInfo: undefined,
                status: "Active",
                paymentStatus: "Paid",
                purchaseToken: purchaseToken[0]._id,
                subtotal,
                discount,
                charge,
                totalAmount,
            }], { session });
        // Create Batch Student
        const batchStudent = yield batchStudent_model_1.BatchStudentModel.create([payload], { session });
        // ✅ Commit transaction
        yield session.commitTransaction();
        session.endSession();
        return {
            message: "Batch student created with purchase and token.",
            purchaseToken: purchaseToken[0],
            purchase: purchase[0],
            batchStudent: batchStudent[0],
        };
    }
    catch (error) {
        // ❌ Rollback transaction
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getAllBatchStudents = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(batchStudent_model_1.BatchStudentModel, query)
        .search(["studentId"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate([
        {
            path: "courseId",
            select: "cover_photo course_title duration course_type ",
        },
    ])
        .populate([{ path: "batchId", select: "name" }])
        .populate([
        { path: "studentId", select: "name role phone profile_picture" },
    ]);
    const result = yield courseQuery.exec();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get  . please try again");
    }
    return result;
});
const getSingleBatchStudent = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batchStudent_model_1.BatchStudentModel.findOne({ _id })
        .populate([
        {
            path: "courseId",
            select: "cover_photo course_title duration course_type ",
        },
    ])
        .populate([{ path: "batchId", select: "name" }])
        .populate([
        { path: "studentId", select: "name role phone profile_picture" },
    ]);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to Create  . please try again");
    }
    return result;
});
const updateBatchStudent = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batchStudent_model_1.BatchStudentModel.findOneAndUpdate({ _id }, payload, {
        runValidators: true,
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update  . please try again");
    }
    return result;
});
const deleteBatchStduent = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batchStudent_model_1.BatchStudentModel.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete  . please try again");
    }
    return result;
});
exports.batchStudentService = {
    createBatchStudent,
    updateBatchStudent,
    deleteBatchStduent,
    getAllBatchStudents,
    getSingleBatchStudent,
};
