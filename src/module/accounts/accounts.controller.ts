import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { accountsService } from "./accounts.service";



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


export const accountsController = {
    createExpense,
    getAllExpense,
    getSingleExpense,
    updateExpense,
    deleteExpense,
    getAllIncomeOrder,
    getAllIncomeSales,
    deleteIncomeOrder,
    deleteIncomeSales
}