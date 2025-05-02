import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IBlog } from "./blog.interface";
import BlogModel from "./blog.model";
import QueryBuilder from "../../builder/querybuilder";
import BlogCategory from "../blogCategory/blogCategory.model";
import { UserModel } from "../user/user.model";

const createBlog = async (payload: IBlog) => {
  const category = await BlogCategory.findOne({ _id: payload.categoryId });
  const user = await UserModel.findOne({ _id: payload.createdBy });
  if (!user || user.role === "student") {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "invalid user id. ",
    );
  } else if (!category) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "invalid  category id. please provide valid id ",
    );
  }

  const result = await BlogModel.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to Create Blog .  try again",
    );
  }
  return result;
};

const getAllBlog = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(BlogModel, query)
    .search(["title", "description"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate([
      {
        path: "categoryId",
        select: "title",
      },
    ])
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
      "Failed to get Blog . please try again",
    );
  }
  return result;
};

const getSingleBlog = async (slug: string) => {
  const result = await BlogModel.findOne({ slug });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to Create Blog . please try again",
    );
  }
  return result;
};

const updateBlog = async (slug: string, payload: IBlog) => {
  const result = await BlogModel.findOneAndUpdate({ slug }, payload, {
    runValidators: true,
    new: true,
  });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update Blog . please try again",
    );
  }
  return result;
};

const deleteBlog = async (slug: string) => {
  const result = await BlogModel.findOneAndUpdate(
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
      "Failed to delete Blog . please try again",
    );
  }
  return result;
};

export const blogService = {
  createBlog,
  deleteBlog,
  updateBlog,
  getAllBlog,
  getSingleBlog,
};
