import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { UserModel } from "../user/user.model";
import { IReferralWithdrawal } from "./withdraw.interface";
import ReferralWithdrawal from "./withdraw.model";
import QueryBuilder from "../../builder/querybuilder";
import ReferDetails from "../referDetails/referDetails.model";
import ReferralReward from "../referalReward/referalReward.model";

const createReferWithdraw = async (payload: IReferralWithdrawal) => {
  const user = await UserModel.findOne({ _id: payload.referrerId });
  if (!user) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "invalid user id. Please provide valid user id",
    );
  }
    // ✅ Check minimum amount
  if (payload.amount < 100) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Minimum withdrawal amount is 100 BDT"
    );
  }
  const referDetails = await ReferDetails.findOne({referrerId:payload.referrerId});
  if (!referDetails) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "invalid transction dd",
    );
  }
  console.log(referDetails)
  const referReward = await ReferralReward.findOne({referDetailsId:referDetails._id});
    if (!referReward ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "invalid transction ff",
    );
  }
  console.log(referReward)
  
    if ((referReward.amount || 0) < payload.amount) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Insufficient referral balance"
    );
  }


  const result = await ReferralWithdrawal.create(payload);
   referReward.amount = (referReward.amount || 0) - payload.amount;
    await referReward.save();
  return result;
};

const getAllReferWithdraw = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(ReferralWithdrawal, query)
    .search(["amount", "referrerId"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate([
      {
        path: "referrerId",
        select: "name role phone profile_picture",
      },
    ]);

  const result = await courseQuery.exec();
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed to get refer withdraw");
  }
  return result;
};

const getSingleReferWithdraw = async (_id: string) => {
  const result = await ReferralWithdrawal.findOne({ _id }).populate([
    {
      path: "referrerId",
      select: "name role phone profile_picture",
    },
  ]);
  return result;
};

const deleteReferWithdraw = async (_id: string) => {
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
  }

  const result = await ReferralWithdrawal.findOneAndUpdate(
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
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed to delete ");
  }
  return result;
};

const updateReferWithdraw = async (
  _id: string,
  payload: IReferralWithdrawal,
) => {
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
  }

  const result = await ReferralWithdrawal.findOneAndUpdate({ _id }, payload, {
    runValidators: true,
    new: true,
  });
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed to update ");
  }
  return result;
};

export const referWithdrawService = {
  createReferWithdraw,
  updateReferWithdraw,
  deleteReferWithdraw,
  getAllReferWithdraw,
  getSingleReferWithdraw,
};
