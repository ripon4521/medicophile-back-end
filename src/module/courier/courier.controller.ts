import { Request, Response } from "express";
import OrderModel from "../order/order.model";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";
import { createPathaoOrder, getPathaoCityList, getPathaoZoneList } from "./courier.service";
import sendResponse from "../../utils/sendResponse";
import { getPathaoToken } from "../../utils/pathao";






export const sendToPathao = async (req: Request, res: Response) => {
    const data = req.body;
    const orderId = req.params._id;
    const order = await OrderModel.findById(orderId);
    if (!order) {
        throw new AppError(StatusCodes.NOT_FOUND,  "Order not found")
    }


    const delivery = await createPathaoOrder(order, data);
sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Percel Send Successfull to courier ",
    data: delivery,
  });
   
};


// controllers/pathao.controller.ts


export const getCities = async (req: Request, res: Response) => {
  const token = await getPathaoToken();
  const cities = await getPathaoCityList(token);
  res.json(cities);
};

export const getZonesByCity = async (req: Request, res: Response) => {
  const { cityId } = req.params;
  const token = await getPathaoToken();
  const zones = await getPathaoZoneList(Number(cityId), token);
  res.json(zones);
};
