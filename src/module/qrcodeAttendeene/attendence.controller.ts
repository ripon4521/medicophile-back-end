import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { attendeceService } from "./attendence.service";
import { StatusCodes } from "http-status-codes";


const createAttendence = catchAsync(async (req: Request, res: Response) => {
    const {studentId} = req.body;
    const result = await attendeceService.createAttendence(studentId);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Attendence Cretaed Successfully",
      data: result,
    });
  });
  


 const getAllAttendance = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await attendeceService.getAllAttendance(query);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Attendance get successfully",
      data: result,
    });
  });

  const deleteAttendance = catchAsync(async (req: Request, res: Response) => {
    const {id} = req.params;
    const result = await attendeceService.deleteAttendance(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Attendance deleted successfully",
      data: result,
    });
  });

  const singleAttendance = catchAsync(async (req: Request, res: Response) => {
    const {id} = req.params;
    const result = await attendeceService.singleAttendance(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Attendance get successfully",
      data: result,
    });
  });




  export const attendenceController = {
    createAttendence,
    getAllAttendance,
    deleteAttendance,
    singleAttendance
}
