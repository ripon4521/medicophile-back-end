import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../helpers/AppError";
import { adminService } from "./admin.service";




const getAllAdmin = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await adminService.getAllAdmin(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Admin getting successfully",
    data: result,
  });
});



const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
  }

  const result = await adminService.deleteAdmin(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "admin Deleted successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
  }
  const data = req.body;
  const result = await adminService.updateAdmin(id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Admin & Nested User Updated successfully",
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.getSingleAdmin(id)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Admin & Nested User get successfully",
    data: result,
  });
});




export const adminController = {
    getAllAdmin,
    updateAdmin,
    deleteAdmin,
    getSingleAdmin
}