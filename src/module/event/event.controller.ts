import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { eventService } from "./event.service";

const createEvent  = catchAsync(async(req, res) =>{
    const result = await eventService.createEventIntoDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: "Event Created Successfully",
        data: result,
      });
})

const getEvents = catchAsync(async(req, res) =>{
    const result = await eventService.getAllEvents();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Events Getting Successfully",
        data: result,
      });
})

const getSingleEvent = catchAsync(async(req, res) =>{
    const { id } = req.params;
    const result = await eventService.getEventById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Event Getting Successfully",
        data: result,
      });
})

const updateEvent = catchAsync(async(req, res) =>{
    const { id } = req.params;
    const result = await eventService.updateEventById(id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Event Updated Successfully",
        data: result,
      });   
})

const deleteEvent = catchAsync(async(req, res) =>{
    const { id } = req.params;
    const result = await eventService.deleteEventById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Event Deleted Successfully",
        data: result,
      });
})

export const eventController = {
    createEvent,
    getEvents,
    getSingleEvent,
    updateEvent,
    deleteEvent,
 };
