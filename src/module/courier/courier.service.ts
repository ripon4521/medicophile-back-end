import axios from 'axios';
import OrderModel from '../order/order.model';
import { getPathaoToken } from '../../utils/pathao';


export const getPathaoCityList = async (token: string) => {
  const res = await axios.get(
    "https://api-hermes.pathao.com/aladdin/api/v1/cities",
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.data;
};

export const getPathaoZoneList = async (cityId: number, token: string) => {
  const res = await axios.get(
    `https://api-hermes.pathao.com/aladdin/api/v1/cities/${cityId}/zones`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.data;
};

export const getCityAndZoneIdByName = async (
  cityName: string,
  zoneName: string,
  token: string
): Promise<{ cityId: number; zoneId: number }> => {
  const cities = await getPathaoCityList(token);
  const city = cities.find((c: any) => c.name.toLowerCase() === cityName.toLowerCase());
  if (!city) throw new Error(`City "${cityName}" not found`);

  const zones = await getPathaoZoneList(city.id, token);
  const zone = zones.find((z: any) => z.name.toLowerCase() === zoneName.toLowerCase());
  if (!zone) throw new Error(`Zone "${zoneName}" not found`);

  return { cityId: city.id, zoneId: zone.id };
};

export const createPathaoOrderService = async (
  orderId: string,
  cityName: string,
  zoneName: string
) => {
  const order = await OrderModel.findById(orderId);
  if (!order) throw new Error("Order not found");

  const token = await getPathaoToken();
  const { cityId, zoneId } = await getCityAndZoneIdByName(cityName, zoneName, token);

  const payload = {
    store_id: "264465",
    merchant_order_id: order._id.toString(),
    recipient_name: order.name,
    recipient_phone: order.phone,
    recipient_address: order.address || "this order is test",
    delivery_type: "regular",
    item_description: "Product Delivery",
    item_quantity: order.quantity,
    item_weight: 1,
    amount_to_collect: 0,
    recipient_city: cityId,
    recipient_zone: zoneId,
  };

  const pathaoRes = await axios.post(
    "https://api-hermes.pathao.com/aladdin/api/v1/merchant-order",
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  console.log(pathaoRes)
  return pathaoRes.data;
};
