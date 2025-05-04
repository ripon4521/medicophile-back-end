import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/querybuilder";
import AppError from "../../helpers/AppError";
import { IReferralReward } from "./referalReward.interface";
import ReferralReward from "./referalReward.model";

const createReferralReward = async (payload: IReferralReward) => {
  const existingReward = await ReferralReward.findOne({
    referDetailsId: payload.referDetailsId,
    isDeleted: false,
  });

  if (existingReward) {
    // Add new amount to existing one
    existingReward.amount += payload.amount;

    if (typeof payload.isPaid === "boolean") {
      existingReward.isPaid = payload.isPaid;

      if (payload.isPaid) {
        existingReward.paidAt = new Date(new Date().getTime() + 6 * 60 * 60 * 1000) 
      } else {
        existingReward.paidAt = undefined; 
      }
    }

    if (payload.note) existingReward.note = payload.note;

    await existingReward.save();
    return existingReward;
  }

  // No existing reward, create new
  const newRewardData = {
    ...payload,
    paidAt: payload.isPaid ? new Date(new Date().getTime() + 6 * 60 * 60 * 1000): undefined,
  };

  const newReward = await ReferralReward.create(newRewardData);
  return newReward;
};


const getAllReferReward = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(ReferralReward, query)
      .search(["referDetailsId"])
      .filter()
      .sort()
      .paginate()
      .fields()
      .populate([
        {
          path: "referDetailsId",
          populate: [{ path: "referrerId", select: "name role phone profile_picture" }, { path:"courseId", select:"course_title duration price"}, 
            {path:"purchaseTokenId", select:"studentId status ref price totalAmount paymentInfo name phone"}],
        },
      ])
    
  
    const result = await courseQuery.exec();
    if (!result) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Failed to get refer reward");
    }
    return result;
  };


export const referRewardService = {
    createReferralReward,
    getAllReferReward
}