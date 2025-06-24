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
exports.enrollmentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const offlineBatch_model_1 = require("../offlineBatch/offlineBatch.model");
const newEnrollment_model_1 = __importDefault(require("./newEnrollment.model"));
const createStudentForPurchase_1 = require("../../utils/createStudentForPurchase");
const user_model_1 = require("../user/user.model");
const course_model_1 = __importDefault(require("../course/course.model"));
const purchaseToken_model_1 = __importDefault(require("../purchaseToken/purchaseToken.model"));
const purchase_model_1 = require("../purchase/purchase.model");
const batchStudent_model_1 = require("../batchStudent/batchStudent.model");
const mongoose_1 = __importDefault(require("mongoose"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const createEnrollment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        if (payload.batchId) {
            const batch = yield offlineBatch_model_1.OfflineBatchModel.findOne({ _id: payload.batchId }).session(session);
            if (!batch) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Not Found Batch");
            }
        }
        const studnetId = yield user_model_1.UserModel.findOne({ phone: payload.phone });
        if (studnetId) {
            payload.studentId = studnetId._id;
        }
        else {
            const studentPayload = {
                name: payload.name,
                phone: payload.phone,
                email: '',
                role: 'student',
                profile_picture: '',
                userId: undefined,
                status: 'Active',
                isDeleted: false,
                password: '',
                gurdianName: '',
                gurdianPhone: '',
                address: '',
            };
            const { user } = yield (0, createStudentForPurchase_1.createStudentWithUser)(studentPayload);
            console.log(user);
            if (!user) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Student Create Failed');
            }
            if (user) {
                payload.studentId = user._id;
            }
        }
        const course = yield course_model_1.default.findOne({ _id: payload.courseId }).session(session);
        if (!course) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Course Not Found');
        }
        const generatedToken = `PT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        const price = course.price || 0;
        const discount = course.offerPrice ? price - course.offerPrice : 0;
        const subtotal = price;
        const charge = 0;
        const totalAmount = subtotal - discount + charge;
        const purchaseToken = yield purchaseToken_model_1.default.create([{
                studentId: payload.studentId,
                courseId: payload.courseId,
                status: "Enrolled",
                purchaseToken: generatedToken,
                price,
                subtotal: payload.paidAmont,
                discount: payload.discount,
                charge,
                totalAmount,
                name: payload.name,
                phone: payload.phone,
            }], { session });
        const purchase = yield purchase_model_1.PurchaseModel.create([{
                studentId: payload.studentId,
                courseId: payload.courseId,
                paymentInfo: undefined,
                status: "Active",
                paymentStatus: "Paid",
                purchaseToken: purchaseToken[0]._id,
                subtotal: payload.paidAmont,
                discount: payload.discount,
                charge,
                totalAmount,
            }], { session });
        if (course.course_type === "offline") {
            yield batchStudent_model_1.BatchStudentModel.create([{
                    studentId: payload.studentId,
                    courseId: payload.courseId,
                    batchId: payload.batchId,
                }], { session });
        }
        const result = yield newEnrollment_model_1.default.create([payload], { session });
        yield session.commitTransaction();
        return result[0];
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const getAllEnrollment = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(newEnrollment_model_1.default, query)
        .search(["name", "phone"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate({
        path: "courseId",
    })
        .populate({
        path: "studentId",
        select: "name role phone profile_picture",
    });
    // ✅ Conditionally populate batch if batchId is present in query
    if (query.batchId) {
        courseQuery.populate({
            path: "batchId",
            match: { _id: query.batchId },
        });
    }
    const result = yield courseQuery.exec();
    return result;
});
const getSingleEnrollment = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const enrollment = yield newEnrollment_model_1.default.findOne({ _id })
        .populate("studentId")
        .populate("courseId");
    // ✅ Only populate batchId if it exists in the enrollment
    if (enrollment === null || enrollment === void 0 ? void 0 : enrollment.batchId) {
        yield enrollment.populate("batchId");
    }
    return enrollment;
});
const updateEnrollment = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield newEnrollment_model_1.default.findOneAndUpdate({ _id }, payload, {
        runValidators: true,
        new: true
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to updated enrollmemt");
    }
    return result;
});
const deleteEnrollment = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield newEnrollment_model_1.default.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to deleted enrollmemt");
    }
    return result;
});
exports.enrollmentService = {
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
    getAllEnrollment,
    getSingleEnrollment,
};
