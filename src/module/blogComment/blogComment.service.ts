import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IBlogComment } from "./blogComment.interface";
import BlogComment from "./blogComment.model";
import QueryBuilder from "../../builder/querybuilder";
import { UserModel } from "../user/user.model";
import BlogModel from "../blog/blog.model";

const createBlogComment = async (payload: IBlogComment) => {
  const user = await UserModel.findOne({ _id: payload.userId });
  const blog = await BlogModel.findOne({ _id: payload.blogId });
  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid user id");
  } else if (!blog) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid blog id");
  }

  const result = await BlogComment.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to Create Blog Comment.  try again",
    );
  }
  return result;
};

const getAllBlogComment = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(BlogComment, query)
    .search(["comment"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate([
      {
        path: "userId",
        select: "name role phone profile_picture",
      },
    ])
    .populate([
      {
        path: "blogId",
        select: "title description categoryId tags",
        populate: [{ path: "categoryId", select: "title" }],
      },
    ]);

  const result = await courseQuery.exec();
  return result;
};

const getSingleBlogComment = async (slug: string) => {
  const result = await BlogComment.findOne({ slug })
    .populate("userId")
    .populate("blogId");
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get Blog Comment. Slug is not valid, reload or go back and try again",
    );
  }
  return result;
};

const updateBlogComment = async (
  slug: string,
  payload: Partial<IBlogComment>,
) => {
  // Update operation
  const update = await BlogComment.findOneAndUpdate({ slug }, payload, {
    new: true,
    runValidators: true,
  });

  if (!update) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update Blog Comment. Slug is not valid, reload or go back and try again",
    );
  }

  return update;
};

const deleteBlogComment = async (slug: string) => {
  const result = await BlogComment.findOneAndUpdate(
    { slug },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    { new: true },
  );
  return result;
};

const getSpecificBlogComment = async (blogId: string) => {
  const result = await BlogComment.find({ blogId: blogId, isDeleted: false });
  return result;
};

export const blogCommentService = {
  createBlogComment,
  updateBlogComment,
  deleteBlogComment,
  getAllBlogComment,
  getSingleBlogComment,
  getSpecificBlogComment,
};
