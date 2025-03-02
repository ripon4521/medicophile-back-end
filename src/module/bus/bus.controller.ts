import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { busService } from "./bus.service";

const createBus = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await busService.createBusIntoDB(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Bus Created Successfully",
    data: result,
  });
});

const getBus = catchAsync(async (req, res) => {
    const result = await busService.getAllBusDataFromDB();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Bus fatched Successfully",
        data: result,
      });
})

const getBusById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await busService.getSingleBusDataFromDBById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Single Bus fetched Successfully",
        data: result,
      });
})

const updateBus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await busService.updateBusDataInDB(id, payload);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Bus updated Successfully",
        data: result,
      });
})

const deleteBus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await busService.deleteBusDataFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Bus deleted Successfully",
        data: result,
      });
});


export const busController ={
    createBus,
    getBus,
    getBusById,
    updateBus,
    deleteBus
}