import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { INotice } from "./notice.interface";
import NoticeModel from "./notice.model";
import { io } from "../../server";
import QueryBuilder from "../../builder/querybuilder";

const createNotice = async (payload: INotice) => {
  const result = await NoticeModel.create(payload);

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to create notice. Please try again",
    );
  }

  io.emit("newNotice", {
    message: "A new notice has been posted",
    notice: result,
  });

  return result;
};

const getAllNoticeFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(NoticeModel, query)
    .search(["title", "message"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path: "createdBy",
      select: "name email phone profile_picture role",
    });

  const result = await courseQuery.exec();
  return result;
};

const getSingleNotice = async (slug: string) => {
  const result = await NoticeModel.findOne({ slug })
    .populate({
      path: "createdBy",
      select: "name email phone profile_picture role",
    });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Faled to get notice, PLease try again",
    );
  }
  return result;
};

const deleteNotice = async (slug: string) => {
  const result = await NoticeModel.findOneAndUpdate(
    { slug },
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
      "Faled to delete notice, PLease try again",
    );
  }
  return result;
};

const updateNotice = async (slug: string, payload: INotice) => {
  const result = await NoticeModel.findOneAndUpdate({ slug }, payload, {
    runValidators: true,
    new: true,
  });

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Faled to update notice, PLease try again",
    );
  }

  // Optional: Emit event
  io.emit("noticeUpdated", {
    message: "A notice has been updated",
    notice: result,
  });

  return result;
};

export const noticeServices = {
  createNotice,
  updateNotice,
  deleteNotice,
  getAllNoticeFromDb,
  getSingleNotice,
};
