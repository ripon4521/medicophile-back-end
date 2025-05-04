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

const singleReferDetails = async(_id:string) => {
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


  export const referDetailsService = {
    getAllReferDetails
  }