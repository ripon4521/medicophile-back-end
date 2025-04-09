import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { docsService } from "./docs.service";
import AppError from "../../helpers/AppError";


const createDocs = catchAsync(async (req, res) => {
    const result = await docsService.cretaeDocs(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Docs Created successfully",
      data: result,
    });
  });

  const updateDocs = catchAsync(async (req, res) => {
    const {_id} = req.body;
    if (!_id) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Provide _id in body")
    }
    const payload = req.body;
    delete payload._id;
    const result = await docsService.updateDocs(_id, payload);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Docs updated successfully",
      data: result,
    });
  });


  const deleteDocs = catchAsync(async (req, res) => {
    const {_id} = req.body;
    if (!_id) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Provide _id in body")
    }
    const result = await docsService.deleteDocs(_id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Docs deleted successfully",
      data: result,
    });
  });

  
  const getAllDocs = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await docsService.getAllDocs(query);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Docs fatched successfully",
      data: result,
    });
  });


  const singleDocs = catchAsync(async (req, res) => {
    const {slug} = req.params;
    const result = await docsService.getSingleDocs(slug);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Docs fatched successfully",
      data: result,
    });
  });

export const docsController = {
    getAllDocs,
    singleDocs,
    updateDocs,
    createDocs,
    deleteDocs
}
