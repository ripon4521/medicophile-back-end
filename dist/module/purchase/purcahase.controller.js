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
exports.purchaseController = exports.getPurchaseStats = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const purchase_service_1 = require("./purchase.service");
const purchase_model_1 = require("./purchase.model");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const createPurchase = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchase_service_1.purchaseService.createPurchase(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Purchase created successfully",
        data: result,
    });
}));
const getAllPurchase = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield purchase_service_1.purchaseService.getAllPurchase(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Purchase get successfully",
        data: result,
    });
}));
const deletePurchase = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const purchas = yield purchase_model_1.PurchaseModel.findOne({ _id: id });
    if (!purchas) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid id. Please provide a valid id");
    }
    const result = yield purchase_service_1.purchaseService.deletePurchase(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Purchase deleted successfully",
        data: result,
    });
}));
const updatePurchase = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const purchas = yield purchase_model_1.PurchaseModel.findOne({ _id: id });
    if (!purchas) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid id. Please provide a valid id");
    }
    const result = yield purchase_service_1.purchaseService.updatePurchase(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Purchase updated successfully",
        data: result,
    });
}));
const getPurchaseStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { day, month, year, startDate, endDate, courseSlug } = req.query;
        let matchCondition = { isDeleted: false };
        // Date filtering
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            matchCondition.createdAt = { $gte: start, $lte: end };
        }
        else if (day && month && year) {
            const start = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
            const end = new Date(`${year}-${month}-${day}T23:59:59.999Z`);
            matchCondition.createdAt = { $gte: start, $lte: end };
        }
        else if (month && year) {
            const start = new Date(`${year}-${month}-01T00:00:00.000Z`);
            const end = new Date(new Date(start).setMonth(new Date(start).getMonth() + 1));
            end.setHours(23, 59, 59, 999);
            matchCondition.createdAt = { $gte: start, $lte: end };
        }
        else if (year) {
            const start = new Date(`${year}-01-01T00:00:00.000Z`);
            const end = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);
            end.setHours(23, 59, 59, 999);
            matchCondition.createdAt = { $gte: start, $lte: end };
        }
        const pipeline = [
            { $match: matchCondition },
            // Join with course
            {
                $lookup: {
                    from: "courses",
                    localField: "courseId",
                    foreignField: "_id",
                    as: "course",
                },
            },
            { $unwind: "$course" },
            // Filter by courseSlug if provided
            ...(courseSlug
                ? [{
                        $match: {
                            "course.slug": { $regex: new RegExp(`^${courseSlug}$`, "i") },
                        },
                    }]
                : []),
            // Join with student
            {
                $lookup: {
                    from: "users",
                    localField: "studentId",
                    foreignField: "_id",
                    as: "student",
                },
            },
            { $unwind: "$student" },
            // Final shape
            {
                $project: {
                    _id: 1,
                    createdAt: 1,
                    status: 1,
                    paymentStatus: 1,
                    purchaseToken: 1,
                    subtotal: 1,
                    discount: 1,
                    charge: 1,
                    totalAmount: 1,
                    isExpire: 1,
                    isDeleted: 1,
                    student: {
                        _id: "$student._id",
                        name: "$student.name",
                        phone: "$student.phone",
                        role: "$student.role",
                    },
                    course: {
                        _id: "$course._id",
                        cover_photo: "$course.cover_photo",
                        course_title: "$course.course_title",
                        description: "$course.description",
                        duration: "$course.duration",
                        preOrder: "$course.preOrder",
                        course_type: "$course.course_type",
                        category: "$course.category",
                        createdBy: "$course.createdBy",
                        expireTime: "$course.expireTime",
                        daySchedule: "$course.daySchedule",
                        timeShedule: "$course.timeShedule",
                        price: "$course.price",
                        offerPrice: "$course.offerPrice",
                        takeReview: "$course.takeReview",
                        status: "$course.status",
                        course_tag: "$course.course_tag",
                        isDeleted: "$course.isDeleted",
                        createdAt: "$course.createdAt",
                        updatedAt: "$course.updatedAt",
                        slug: "$course.slug",
                    }
                }
            }
        ];
        const data = yield purchase_model_1.PurchaseModel.aggregate(pipeline);
        res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error,
        });
    }
});
exports.getPurchaseStats = getPurchaseStats;
exports.purchaseController = {
    createPurchase,
    getAllPurchase,
    deletePurchase,
    updatePurchase,
    getPurchaseStats: exports.getPurchaseStats
};
