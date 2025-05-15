import ReferralLinkModel from "./generateReferLink.model"; // মডেল ইম্পোর্ট
import { IReferral } from "./generateReferLink.interface";
import mongoose from "mongoose";

const generateReferralLink = async (
  userId: string,
  courseSlug: string,
  courseId: string,
): Promise<string> => {
  try {
    // Create or get existing referral for user and course
    let referral = await ReferralLinkModel.findOne({ userId, courseId });

    if (!referral) {
      // Referral doesn't exist, create a new one
      referral = new ReferralLinkModel({
        userId,
        courseId,
      });

      // Save new referral
      await referral.save();
    }

    // Return referral link
    return `https://iconadmissionaid.com/course-details/${courseSlug}?courseId=${courseId}&ref=${referral.userId}`;
  } catch (error) {
    throw new Error(`Error generating referral link: ${error}`);
  }
};

const getReferLink = async () => {
  const result = await ReferralLinkModel.find();
  return result;
};

export const referalLinkService = {
  generateReferralLink,
  getReferLink,
};
