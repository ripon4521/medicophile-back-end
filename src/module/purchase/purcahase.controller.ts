import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { purchaseService } from "./purchase.service";
import { PurchaseModel } from "./purchase.model";
import AppError from "../../helpers/AppError";
import { Request, Response } from "express";

const createPurchase = catchAsync(async (req, res) => {
  const result = await purchaseService.createPurchase(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Purchase created successfully",
    data: result,
  });
});

const getAllPurchase = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await purchaseService.getAllPurchase(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Purchase get successfully",
    data: result,
  });
});

const deletePurchase = catchAsync(async (req, res) => {
  const { id } = req.params;
  const purchas = await PurchaseModel.findOne({ _id: id });
  if (!purchas) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "invalid id. Please provide a valid id",
    );
  }
  const result = await purchaseService.deletePurchase(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Purchase deleted successfully",
    data: result,
  });
});

const updatePurchase = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const purchas = await PurchaseModel.findOne({ _id: id });
  if (!purchas) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "invalid id. Please provide a valid id",
    );
  }
  const result = await purchaseService.updatePurchase(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Purchase updated successfully",
    data: result,
  });
});






export const getPurchaseStats = async (req: Request, res: Response) => {
  try {
    const { day, month, year, startDate, endDate, courseSlug } = req.query;

    let matchCondition: any = { isDeleted: false };

    // Date filtering
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      end.setHours(23, 59, 59, 999);
      matchCondition.createdAt = { $gte: start, $lte: end };
    } else if (day && month && year) {
      const start = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
      const end = new Date(`${year}-${month}-${day}T23:59:59.999Z`);
      matchCondition.createdAt = { $gte: start, $lte: end };
    } else if (month && year) {
      const start = new Date(`${year}-${month}-01T00:00:00.000Z`);
      const end = new Date(new Date(start).setMonth(new Date(start).getMonth() + 1));
      end.setHours(23, 59, 59, 999);
      matchCondition.createdAt = { $gte: start, $lte: end };
    } else if (year) {
      const start = new Date(`${year}-01-01T00:00:00.000Z`);
      const end = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);
      end.setHours(23, 59, 59, 999);
      matchCondition.createdAt = { $gte: start, $lte: end };
    }

    const pipeline: any[] = [
      { $match: matchCondition },

      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
    ];

    if (courseSlug) {
      pipeline.push({
        $match: {
          "course.slug": { $regex: new RegExp(`^${courseSlug}$`, "i") },
        },
      });
    }

    // Join with student
    pipeline.push({
      $lookup: {
        from: "users",
        localField: "studentId",
        foreignField: "_id",
        as: "student",
      },
    });
    pipeline.push({ $unwind: "$student" });

    // Group by course
    pipeline.push({
      $group: {
        _id: "$courseId",
        courseInfo: { $first: "$course" },
        totalPurchases: { $sum: 1 },
        purchases: {
          $push: {
            _id: "$_id",
            createdAt: "$createdAt",
            student: {
              _id: "$student._id",
              name: "$student.name",
              email: "$student.email",
              phone: "$student.phone",
              role: "$student.role",
            },
          },
        },
      },
    });

    pipeline.push({
      $project: {
        _id: 0,
        courseId: "$_id",
        courseTitle: "$courseInfo.title",
        amount: "$courseInfo.price",
        courseSlug: "$courseInfo.slug", // optional
        totalPurchases: 1,
        purchases: 1,
      },
    });

    const stats = await PurchaseModel.aggregate(pipeline);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};







export const purchaseController = {
  createPurchase,
  getAllPurchase,
  deletePurchase,
  updatePurchase,
  getPurchaseStats
};
