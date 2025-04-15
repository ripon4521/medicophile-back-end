import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IBlogComment } from "./blogComment.interface";
import BlogComment from "./blogComment.model";
import QueryBuilder from "../../builder/querybuilder";


const createBlogComment = async (payload: IBlogComment) => {
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
      .populate(["userId"])
      .populate(["blogId"]);
  
    const result = await courseQuery.exec();
    return result;
  };

  const getSingleBlogComment = async (slug: string) => {
    const result = await BlogComment.findOne({ slug }).populate("userId").populate("blogId");
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
  
  const getSpecificBlogComment = async(blogId:string) => {
    const result  = await BlogComment.find({blogId:blogId, isDeleted:false});
    return result
  }



export const blogCommentService = {
    createBlogComment,
    updateBlogComment,
    deleteBlogComment,
    getAllBlogComment,
    getSingleBlogComment,
    getSpecificBlogComment
}