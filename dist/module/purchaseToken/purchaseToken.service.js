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
exports.purchaseTokenService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const user_model_1 = require("../user/user.model");
const purchaseToken_model_1 = __importDefault(require("./purchaseToken.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const course_model_1 = __importDefault(require("../course/course.model"));
const referDetails_model_1 = __importDefault(require("../referDetails/referDetails.model"));
const createStudentForPurchase_1 = require("../../utils/createStudentForPurchase");
const purchase_service_1 = require("../purchase/purchase.service");
const mongoose_1 = __importDefault(require("mongoose"));
const createPurchaseToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Validate studentId or try to find by phone
        if (!payload.studentId) {
            if (payload.phone && payload.phone.trim() !== "") {
                const user = yield user_model_1.UserModel.findOne({ phone: payload.phone.trim() }).session(session);
                if (user) {
                    payload.studentId = user._id;
                }
            }
            // If still no studentId, create new student + user
            if (!payload.studentId) {
                // Basic validation for required fields before creating student
                if (!payload.name || payload.name.trim() === "") {
                    throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Student name is required to create new student");
                }
                if (!payload.phone || payload.phone.trim() === "") {
                    throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Phone number is required to create new student");
                }
                const studentPayload = {
                    name: payload.name.trim(),
                    phone: payload.phone.trim(),
                    email: '', // Optional or blank
                    role: 'student',
                    profile_picture: '',
                    userId: undefined,
                    status: 'Active',
                    isDeleted: false,
                    password: '', // Should be hashed if set later
                    gurdianName: '',
                    gurdianPhone: '',
                    address: '',
                };
                const { user } = yield (0, createStudentForPurchase_1.createStudentWithUser)(studentPayload, session);
                if (!user) {
                    throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Student creation failed');
                }
                payload.studentId = user._id;
            }
        }
        // Validate course existence
        const course = yield course_model_1.default.findOne({ _id: payload.courseId, isDeleted: false }).session(session);
        if (!course) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid course id');
        }
        // Create PurchaseToken document
        const result = yield purchaseToken_model_1.default.create([payload], { session });
        if (!result || result.length === 0) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create purchase token');
        }
        const purchaseToken = result[0];
        // Create referral detail if referrer exists
        if (payload.ref) {
            yield referDetails_model_1.default.create([{
                    referrerId: payload.ref,
                    referredUserId: payload.studentId,
                    courseId: payload.courseId,
                    purchaseTokenId: purchaseToken._id,
                }], { session });
        }
        // Create Purchase entry based on PurchaseToken info
        const purchasePayload = {
            charge: purchaseToken.charge,
            discount: purchaseToken.discount,
            totalAmount: purchaseToken.totalAmount,
            subtotal: purchaseToken.subtotal,
            courseId: purchaseToken.courseId,
            studentId: purchaseToken.studentId,
            purchaseToken: purchaseToken._id,
            paymentInfo: purchaseToken.paymentInfo,
            paymentStatus: "Paid",
            status: "Active",
            isExpire: false,
        };
        const purchaseResult = yield purchase_service_1.purchaseService.createPurchase(purchasePayload, session);
        if (!purchaseResult) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create purchase');
        }
        // Commit transaction & end session
        yield session.commitTransaction();
        session.endSession();
        return purchaseToken;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        console.error('❌ Error creating purchase token:', error);
        throw error;
    }
});
// export default createPurchaseToken;
const getAllPurchasseToken = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(purchaseToken_model_1.default, query)
        .search([""])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate([
        {
            path: "courseId",
            select: "cover_photo course_title description duration price offerPrice",
            populate: { path: "category", select: "title cover_photo" },
        },
    ])
        .populate([
        {
            path: "studentId",
            select: "name role phone",
        },
    ]);
    const result = yield courseQuery.exec();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get purchase token");
    }
    return result;
});
const updatePurchaseToken = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide _id");
    }
    const result = yield purchaseToken_model_1.default.findOneAndUpdate({ _id }, payload, {
        runValidators: true,
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update purchase token");
    }
    return result;
});
const deletePurchaseToken = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide _id");
    }
    const result = yield purchaseToken_model_1.default.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete purchase token");
    }
    return result;
});
exports.purchaseTokenService = {
    createPurchaseToken,
    getAllPurchasseToken,
    updatePurchaseToken,
    deletePurchaseToken,
};
