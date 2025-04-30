import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IBookCategory } from "./bookCategory.interface";
import BookCategoryModel from "./bookCategory.model";
import QueryBuilder from "../../builder/querybuilder";
import { UserModel } from "../user/user.model";

const createBookCategory = async (payload: IBookCategory) => {
  const user = await UserModel.findOne({
    _id: payload.createdBy,
    isDeleted: false,
  });
  if (!user || user.role === "student") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Invalid user id. Only admin or teacher can create product category .Please  try again",
    );
  }
  const result = await BookCategoryModel.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to Create Book Category.Please  try again",
    );
  }
  return result;
};

const updateBookCategory = async (slug: string, payload: IBookCategory) => {
  const isexist = await BookCategoryModel.findOne({
    slug: slug,
    isDeleted: false,
  });
  if (!isexist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Slug is not valid.Please  try again",
    );
  }
  const result = await BookCategoryModel.findOneAndUpdate({ slug }, payload, {
    runValidators: true,
    new: true,
  });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to Update Book Category.Please  try again",
    );
  }
  return result;
};

const deleteBookCategory = async (slug: string) => {
  const isexist = await BookCategoryModel.findOne({
    slug: slug,
    isDeleted: false,
  });
  if (!isexist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Slug is not valid.Please  try again",
    );
  }
  const result = await BookCategoryModel.findOneAndUpdate(
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
      "Failed to Delete Book Category.Please  try again",
    );
  }
  return result;
};

const getAllBookCategory = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(BookCategoryModel, query)
    .search(["name", "description"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate([
      {
        path: "createdBy",
        select: "name role phone",
      },
    ]);

  const result = await courseQuery.exec();
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get Book Category. please try again",
    );
  }
  return result;
};

const getSingleBookCategory = async (slug: string) => {
  const result = await BookCategoryModel.findOne({ slug });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to Get Single Book Category.Please  try again",
    );
  }
  return result;
};

export const bookCategoryService = {
  createBookCategory,
  updateBookCategory,
  deleteBookCategory,
  getAllBookCategory,
  getSingleBookCategory,
};
