import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { createPathaoOrderService } from './courier.service';
import sendResponse from '../../utils/sendResponse';


const createPathaoOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { city, zone } = req.body;

  const result = await createPathaoOrderService(orderId, city, zone);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Order created in Pathao successfully',
    data: result,
  });
});

export const pathaoController = {
  createPathaoOrder,
};
