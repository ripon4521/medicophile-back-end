import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { preorderService } from "./preorder.service";

const createPreOrder = catchAsync(async(req, res) => {
    const payload = req.body;
    const result = await preorderService.createPreorderIntoDb(payload);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Pre Order Created successfully',
        data: result,
    });
});

const getAllPreOrders = catchAsync(async (req, res) => {
    const preorders = await preorderService.getAllPreorders();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Pre Orders fetched successfully',
        data: preorders,
    });
});

const getSinglePreOrder = catchAsync(async (req, res) => {
    const { id } = req.params;
    const preorder = await preorderService.getPreorderById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Pre Order fetched successfully',
        data: preorder,
    });
});

const updatePreOrder = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await preorderService.updatePreorderById(id, payload);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Pre Order updated successfully',
        data: result,
    });
});

const deletePreOrder = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await preorderService.deletePreorderById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Pre Order deleted successfully',
        data: result,
    });
})

export const preorderController = {
    createPreOrder,
    getAllPreOrders,
    getSinglePreOrder,
    updatePreOrder,
    deletePreOrder,
};
