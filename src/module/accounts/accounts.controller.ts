import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { accountsService } from "./accounts.service";
import { Request, Response } from "express";
import OrderModel from "../order/order.model";
import { SalesModel } from "./sales.model";
import { ExpenseModel } from "./expense.model";



const createExpense = catchAsync(async (req, res) => {
  const result = await accountsService.createExpense(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Expense  Created successfully",
    data: result,
  });
});



const getAllExpense = catchAsync(async (req, res) => {
    const query = req.query;
  const result = await accountsService.getAllExpense(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Expense  get successfully",
    data: result,
  });
});


const getAllIncomeOrder = catchAsync(async (req, res) => {
    const query = req.query;
  const result = await accountsService.getAllIncomeOrder(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Income Order  get successfully",
    data: result,
  });
});


const getAllIncomeSales = catchAsync(async (req, res) => {
    const query = req.query;
  const result = await accountsService.getAllincomeSales(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Income Sales  get successfully",
    data: result,
  });
});

const updateExpense = catchAsync(async (req, res) => {
    const {slug} = req.params;
    const payload = req.body;
  const result = await accountsService.updateExpense(slug,payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Expense updated successfully",
    data: result,
  });
});


const getSingleExpense = catchAsync(async (req, res) => {
    const {slug} = req.params;
  
  const result = await accountsService.getSingleExpense(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Single Expense get successfully",
    data: result,
  });
});



const deleteExpense = catchAsync(async (req, res) => {
    const {slug} = req.params;
  const result = await accountsService.deleteExpense(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Expense deleted successfully",
    data: result,
  });
});



const deleteIncomeOrder = catchAsync(async (req, res) => {
    const {id} = req.params;
  const result = await accountsService.deleteIncomeOrder(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Income Order deleted successfully",
    data: result,
  });
});



const deleteIncomeSales = catchAsync(async (req, res) => {
    const {id} = req.params;
  const result = await accountsService.deleteIncomeSales(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Income Sales deleted successfully",
    data: result,
  });
});





export const getIncomeReport = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    const filter: any = {};

    // Only add createdAt filter if at least one date is provided
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate as string);
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate as string);
      }
    }

    const orderQuery = {
      ...filter,
      paymentStatus: "Paid",
    };

    const salesQuery = {
      ...filter
    };

    const orders = await OrderModel.find(orderQuery);
    const sales = await SalesModel.find(salesQuery);
 

    const orderIncome = orders.reduce((acc, curr) => acc + curr.paidAmount, 0);
    const salesIncome = sales.reduce((acc, curr) => acc + curr.amount, 0);
    const totalIncome = orderIncome + salesIncome;

    res.status(StatusCodes.OK).json({
      success: true,
      totalIncome,
      breakdown: {
        orderIncome,
        salesIncome,
        orderCount: orders.length,
        salesCount: sales.length,
      },
      details: {
        orders,
        sales,
      },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to generate income report",
      error,
    });
  }
};




export const getExpenseReport = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    const filter: any = {
      isDeleted: false,
      ...(startDate && endDate
        ? {
            createdAt: {
              $gte: new Date(startDate as string),
              $lte: new Date(endDate as string),
            },
          }
        : {}),
    };

    const expenses = await ExpenseModel.find(filter);

    const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    res.status(StatusCodes.OK).json({
      success: true,
      totalExpense,
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to generate expense report',
      error: error,
    });
  }
};













export const accountsController = {
    createExpense,
    getAllExpense,
    getSingleExpense,
    updateExpense,
    deleteExpense,
    getAllIncomeOrder,
    getAllIncomeSales,
    deleteIncomeOrder,
    deleteIncomeSales,
    getIncomeReport,
    getExpenseReport
}