import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { referalLinkService } from "./generateReferLink.service";

const createReferalLink = catchAsync(async (req, res) => {
  const { userId, courseSlug, courseId } = req.body;
  const result = await referalLinkService.generateReferralLink(
    userId,
    courseSlug,
    courseId,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Referal Link Generate Successfully",
    data: result,
  });
});

const getAllRferLink = catchAsync(async (req, res) => {
  const result = await referalLinkService.getReferLink();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Refer Link fatched successfully",
    data: result,
  });
});

export const referallinkController = {
  createReferalLink,
  getAllRferLink,
};
