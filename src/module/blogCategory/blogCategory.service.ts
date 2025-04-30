import slugify from "slugify";

import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IBlogCategory } from "./blogCategory.interface";
import BlogCategory from "./blogCategory.model";
import QueryBuilder from "../../builder/querybuilder";
import { UserModel } from "../user/user.model";

const createBlogCategory = async (payload: IBlogCategory) => {
  const user = await UserModel.findOne({ _id: payload.createdBy });
  if (!user) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "invalid user id. Please provide valid user id",
    );
  }
  const result = await BlogCategory.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to Create Blog Ctaegory.  try again",
    );
  }
  return result;
};

const getAllBlogCategory = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(BlogCategory, query)
    .search(["title"])
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
  return result;
};

const getSingleBlogCatgeory = async (slug: string) => {
  const result = await BlogCategory.findOne({ slug }).populate("createdBy");
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get Blog Ctaegory. Slug is not valid, reload or go back and try again",
    );
  }
  return result;
};

const updateBlogCategory = async (
  slug: string,
  payload: Partial<IBlogCategory>,
) => {
  // Update operation
  const update = await BlogCategory.findOneAndUpdate({ slug }, payload, {
    new: true,
    runValidators: true,
  });

  if (!update) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update Blog Ctaegory. Slug is not valid, reload or go back and try again",
    );
  }

  return update;
};

const deleteBlogCategory = async (slug: string) => {
  const result = await BlogCategory.findOneAndUpdate(
    { slug },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    { new: true },
  );
  return result;
};

export const blogCategoryService = {
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getAllBlogCategory,
  getSingleBlogCatgeory,
};
