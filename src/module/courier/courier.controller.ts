import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { createPathaoOrderService, getCityList, getPathaoToken, getZoneList } from './courier.service';
import sendResponse from '../../utils/sendResponse';

const createPathaoOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { city, zone, area } = req.body;  // area optional

  const result = await createPathaoOrderService(orderId, city, zone, area);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Order created in Pathao  successfully',
    data: result,
  });
});


export const getCitiesWithZones = async (req: Request, res: Response) => {
  try {
    const token = await getPathaoToken();
    const cities = await getCityList(token);

    const cityZoneList = await Promise.all(
      cities.map(async (city: any) => {
        const zones = await getZoneList(city.city_id, token);
        return {
          city_id: city.city_id,
          city_name: city.city_name,
          zones: zones.map((zone: any) => ({
            zone_id: zone.zone_id,
            zone_name: zone.zone_name,
          })),
        };
      })
    );

    res.json({ success: true, data: cityZoneList });
  } catch (error) {
    console.error("Failed to fetch city-zone list:", error);
    res.status(500).json({ success: false, message: "Failed to fetch city-zone list" });
  }
};





export const pathaoController = {
  createPathaoOrder,
  getCitiesWithZones
};




