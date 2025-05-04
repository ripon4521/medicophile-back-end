import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/querybuilder";
import AppError from "../../helpers/AppError";
import ReferDetails from "./referDetails.model";


const getAllReferDetails = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(ReferDetails, query)
      .search(["courseId"])
      .filter()
      .sort()
      .paginate()
      .fields()
      .populate([
        {
          path: "courseId",
          select:
            "cover_photo course_title description duration price offerPrice",
          populate: { path: "category", select: "title cover_photo" },
        },
      ])
      .populate([
        {
          path: "referredUserId",
          select: "name role phone profile_picture",
        },
      ])
      .populate([
        {
          path: "referrerId",
          select: "name role phone profile_picture",
        },
      ])
      .populate([
        {
          path: "purchaseTokenId",
          select:"status paymentInfo name phone"
        
        },
      ])
  
    const result = await courseQuery.exec();
    if (!result) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Failed to get refer details");
    }
    return result;
  };

export const singleReferDetails = async(_id:string) => {
    const result = await ReferDetails.findOne({_id}) .populate([
        {
          path: "courseId",
          select:
            "cover_photo course_title description duration price offerPrice",
          populate: { path: "category", select: "title cover_photo" },
        },
      ])
      .populate([
        {
          path: "referredUserId",
          select: "name role phone profile_picture",
        },
      ])
      .populate([
        {
          path: "referrerId",
          select: "name role phone profile_picture",
        },
      ])
      .populate([
        {
          path: "purchaseTokenId",
          select:"status paymentInfo name phone"
        
        },
      ]);
      return result;
}

const deleteReferDetails = async (_id: string) => {
    if (!_id) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
    }
  
    const result = await ReferDetails.findOneAndUpdate(
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
        "Failed to delete ",
      );
    }
    return result;
  };

  export const referDetailsService = {
    getAllReferDetails,
    deleteReferDetails,
  
  }