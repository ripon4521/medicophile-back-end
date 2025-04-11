import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IDocs } from "./docs.interface";
import DocsModel from "./docs.model";
import QueryBuilder from "../../builder/querybuilder";

const cretaeDocs = async (payload: IDocs) => {
  const result = await DocsModel.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to create docs. Please check and try again",
    );
  }
  return result;
};

const getAllDocs = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(DocsModel, query)
    .search(["title"])
    .paginate();
  const result = await courseQuery.exec();
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get docs. Please check and try again",
    );
  }
  return result;
};

const getSingleDocs = async (slug: string) => {
  const result = await DocsModel.findOne({ slug });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to fatched docs. Please check slug and try again",
    );
  }
  return result;
};

const updateDocs = async (_id: string, payload: IDocs) => {
  const result = await DocsModel.findOneAndUpdate({ _id }, payload, {
    runValidators: true,
    new: true,
  });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update docs. Please check id and try again",
    );
  }
  return result;
};

const deleteDocs = async (_id: string) => {
  const result = await DocsModel.findOneAndUpdate(
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
      "Failed to delete docs. Please check id and try again",
    );
  }
  return result;
};

export const docsService = {
  cretaeDocs,
  updateDocs,
  getAllDocs,
  deleteDocs,
  getSingleDocs,
};
