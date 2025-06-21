import axios from "axios";
import OrderModel from "../order/order.model";

export const pathaoConfig = {
  baseUrl: "https://api-hermes.pathao.com/aladdin/api/v1",
  storeId: 264465,
  clientId: "MYer23EeOB",
  clientSecret: "ngx5RBpmaxTi9S2zYcL0QjxXKmBcc50wuwlwqB1g",
  username: "iconadmission99@gmail.com",
  password: "ICONAdmissionAid@99",
};

let accessToken = "";
let tokenExpiry = 0;

export const getPathaoToken = async (): Promise<string> => {
  if (accessToken && Date.now() < tokenExpiry) return accessToken;

  try {
    const response = await axios.post(
      `${pathaoConfig.baseUrl}/issue-token`,
      {
        client_id: pathaoConfig.clientId,
        client_secret: pathaoConfig.clientSecret,
        grant_type: "password",
        username: pathaoConfig.username,
        password: pathaoConfig.password,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    // console.log(response.data)

    accessToken = response.data.access_token;
    // console.log(accessToken)
    tokenExpiry = Date.now() + response.data.expires_in * 1000;
    // console.log(accessToken)
    return accessToken;
  } catch (error) {
    console.error("Failed to fetch Pathao token:", error);
    throw new Error("Could not fetch Pathao token");
  }
};

export const getCityList = async (token: string) => {
  const res = await axios.get(`${pathaoConfig.baseUrl}/city-list`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data.data;
};

export const getZoneList = async (cityId: number, token: string) => {
  const res = await axios.get(
    `${pathaoConfig.baseUrl}/cities/${cityId}/zone-list`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data.data;
};

export const getAreaList = async (zoneId: number, token: string) => {
  const res = await axios.get(
    `${pathaoConfig.baseUrl}/zones/${zoneId}/area-list`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data.data;
};

export const getCityAndZoneByName = async (
  cityName: string,
  zoneName: string,
  token: string
): Promise<{ cityId: number; zoneId: number }> => {
  const cities = await getCityList(token);
  const city = cities.find(
    (c: any) => c.city_name.toLowerCase() === cityName.toLowerCase()
  );
  if (!city) throw new Error(`City "${cityName}" not found`);

  const zones = await getZoneList(city.city_id, token);
  const zone = zones.find(
    (z: any) => z.zone_name.toLowerCase() === zoneName.toLowerCase()
  );
  if (!zone) throw new Error(`Zone "${zoneName}" not found`);

  return { cityId: city.city_id, zoneId: zone.zone_id };
};

export const createPathaoOrderService = async (
  orderId: string,
  cityName: string,
  zoneName: string,
  areaName?: string // Optional
) => {
  const order = await OrderModel.findById(orderId);
  if (!order) throw new Error("Order not found");

  const token = await getPathaoToken();

  const { cityId, zoneId } = await getCityAndZoneByName(
    cityName,
    zoneName,
    token
  );

  let areaId: number | undefined = undefined;

  if (areaName) {
    try {
      const areas = await getAreaList(zoneId, token);
      const area = areas.find(
        (a: any) => a.area_name.toLowerCase() === areaName.toLowerCase()
      );
      if (area) areaId = area.area_id;
    } catch (err) {
      console.warn("Area fetch error or no area found for this zone", err);
    }
  }
  // console.log(cityId, zoneId, areaId)
  const cleanPhoneNumber = (phone: string): string => {
    // শুধুমাত্র সংখ্যা রাখবে, সব non-digit সরাবে
    return phone.replace(/\D/g, "");
  };

  const payload: any = {
    store_id: pathaoConfig.storeId,
    merchant_order_id: order._id,
    recipient_name: order.name,
    recipient_phone: cleanPhoneNumber(order.phone),
    recipient_address: "This order is test order",
    delivery_type: 48,
    item_type: 2,
    item_description: "Product Delivery",
    item_quantity: 1,
    item_weight: 1,
    amount_to_collect: 0,
    recipient_city: cityId,
    recipient_zone: zoneId,
  };

  if (areaId) {
    payload.recipient_area = areaId;
  }

  try {
    console.log(accessToken);
    console.log(pathaoConfig.baseUrl);
    console.log(payload);

    // const pathaoRes = await axios.post(
    //   `${pathaoConfig.baseUrl}/orders`,
    //   payload,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // return pathaoRes.data;

    const response = await fetch(`${pathaoConfig.baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Pathao API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("data",data)



  } catch (error: any) {
    console.error(
      "Pathao order creation failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};
