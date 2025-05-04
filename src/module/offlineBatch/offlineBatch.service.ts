import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import courseModel from "../course/course.model";
import { IOfflineBatch } from "./offlineBatch.interface";
import { OfflineBatchModel } from "./offlineBatch.model";
import QueryBuilder from "../../builder/querybuilder";

const createOfflineBatch = async (paload: IOfflineBatch) => {
  const course = await courseModel.findOne({
    _id: paload.courseId,
    isDeleted: false,
  });

  if (!course) {
    throw new AppError(StatusCodes.NOT_FOUND, "Inavlid course id");
  }
  const result = await OfflineBatchModel.create(paload);
  return result;
};

const getAllOfflineBatch = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(OfflineBatchModel, query)
    .search(["name"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({ path: "courseId" });

  const result = await courseQuery.exec();
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed  to get Offline Batch ",
    );
  }
  return result;
};

const getSingleOfflineBatch = async (slug: string) => {
  const result = await OfflineBatchModel.findOne({ slug }).populate({
    path: "courseId",
    select:
      "cover_photo course_title description duration course_type category daySchedule expireTime price offerPrice status slug",
  });

  return result;
};

const updateOfflineBatch = async (
  slug: string,
  payload: Partial<IOfflineBatch>,
) => {
  const update = await OfflineBatchModel.findOneAndUpdate({ slug }, payload, {
    new: true,
    runValidators: true,
  });
  if (!update) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update Offline Batch.",
    );
  }
  return update;
};

const deleteOffLineBatch = async (slug: string) => {
  const result = await OfflineBatchModel.findOneAndUpdate(
    { slug },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    { new: true },
  );

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Faile to delete PLease Try Again ",
    );
  }
  return result;
};

export const offlineBatchService = {
  createOfflineBatch,
  updateOfflineBatch,
  deleteOffLineBatch,
  getAllOfflineBatch,
  getSingleOfflineBatch,
};
