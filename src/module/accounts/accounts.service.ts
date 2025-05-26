import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/querybuilder";
import AppError from "../../helpers/AppError";
import { IncomeModel } from "./income.model";
import { string } from "zod";
import { SalesModel } from "./sales.model";
import { IExpense } from "./accounts.interface";
import { ExpenseModel } from "./expense.model";
import { UserModel } from "../user/user.model";





const getAllIncomeOrder = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(IncomeModel, query)
    .search(["source", "orderId", "customerId"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate([
      {
        path: "orderId",
        
      },
    ])
    .populate([
      {
        path: "customerId",
        select: "name role phone",
      },
    ]);


     const result = await courseQuery.exec();
      if (!result) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "Failed to get order . please try again",
        );
      }
      return result;


}


const getAllincomeSales = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(SalesModel, query)
    .search(["source", "purchaseId", "customerId"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate([
      {
        path: "purchaseId",
        
      },
    ])
    .populate([
      {
        path: "customerId",
        select: "name role phone",
      },
    ]);


     const result = await courseQuery.exec();
      if (!result) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "Failed to get sales . please try again",
        );
      }
      return result;


}

const deleteIncomeOrder = async (_id:string) => {

  const result = await IncomeModel.findOneAndUpdate(
    { _id },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    {
      new: true,
    },
  );
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to delete income  order. please try again",
    );
  }
  return result;
};


const deleteIncomeSales = async (_id:string) => {

  const result = await SalesModel.findOneAndUpdate(
    { _id },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    {
      new: true,
    },
  );
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to delete income  . please try again",
    );
  }
  return result;
};


const createExpense = async(payload:IExpense) => {
    const user = await UserModel.findOne({_id:payload.addedBy});
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found")
    }
    const result = await ExpenseModel.create(payload);
    return result;
}

const getAllExpense = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(ExpenseModel, query)
    .search(["title", "description", "category", "paymentMethod"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate([
      {
        path: "addedBy",
        select: "name role phone profile_picture",
      },
    ]);


     const result = await courseQuery.exec();
      if (!result) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "Failed to get expense . please try again",
        );
      }
      return result;


}

const getSingleExpense = async(slug:string) => {
    const result = await ExpenseModel.findOne({slug}).populate("addedBy");
    return result;

}

const updateExpense = async(slug:string, payload:IExpense) => {
        const update = await ExpenseModel.findOneAndUpdate({slug},payload,{
            runValidators:true,
            new:true
        })
 if (!update) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update Expense . please try again",
    );
  }
        return update;
}

const deleteExpense = async(slug:string) =>{
const result = await ExpenseModel.findOneAndUpdate(
    { slug },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    {
      new: true,
    },
  );
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to delete income  . please try again",
    );
  }
  return result;
}


export const accountsService = {
    getAllExpense,
    getAllIncomeOrder,
    getAllincomeSales,
    getSingleExpense,
    deleteExpense,
    deleteIncomeOrder,
    deleteIncomeSales,
    updateExpense,
    createExpense
}