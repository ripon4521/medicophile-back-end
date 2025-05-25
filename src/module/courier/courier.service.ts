// pathao/pathao.service.ts
import axios from 'axios';

import { IOrder } from '../order/order.interface';
import { getPathaoToken } from '../../utils/pathao';

export const createPathaoOrder = async (order : any, data:any) => {
  const token = await getPathaoToken();

  const payload = {
    store_id: "264465",
    merchant_order_id: order._id.toString(),
    recipient_name: order.name,
    recipient_phone: order.phone,
    recipient_address: order.address,
    delivery_type: "regular",
    item_description: "Product Delivery",
    item_quantity: order.quantity,
    item_weight: 1,
    amount_to_collect: 0,
    recipient_city: 1, // ⚠️ Must update with real city ID
    recipient_zone: 12, // ⚠️ Must update with real zone ID
  };

  const response = await axios.post(
    "https://api-hermes.pathao.com/aladdin/api/v1/merchant-order",
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};


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
