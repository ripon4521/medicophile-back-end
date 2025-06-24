"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPathaoOrderService = exports.getCityAndZoneByName = exports.getAreaList = exports.getZoneList = exports.getCityList = exports.getPathaoToken = exports.pathaoConfig = void 0;
const axios_1 = __importDefault(require("axios"));
const order_model_1 = __importDefault(require("../order/order.model"));
exports.pathaoConfig = {
    baseUrl: "https://courier-api-sandbox.pathao.com/aladdin/api/v1",
    storeId: 148058,
    clientId: "7N1aMJQbWm",
    clientSecret: "wRcaibZkUdSNz2EI9ZyuXLlNrnAv0TdPUPXMnD39",
    username: "test@pathao.com",
    password: "lovePathao",
};
let accessToken = "";
let tokenExpiry = 0;
const getPathaoToken = () => __awaiter(void 0, void 0, void 0, function* () {
    if (accessToken && Date.now() < tokenExpiry)
        return accessToken;
    try {
        const response = yield axios_1.default.post(`${exports.pathaoConfig.baseUrl}/issue-token`, {
            client_id: exports.pathaoConfig.clientId,
            client_secret: exports.pathaoConfig.clientSecret,
            grant_type: "password",
            username: exports.pathaoConfig.username,
            password: exports.pathaoConfig.password,
        }, { headers: { "Content-Type": "application/json" } });
        // console.log(response.data)
        accessToken = response.data.access_token;
        // console.log(accessToken)
        tokenExpiry = Date.now() + response.data.expires_in * 1000;
        // console.log(accessToken)
        return accessToken;
    }
    catch (error) {
        console.error("Failed to fetch Pathao token:", error);
        throw new Error("Could not fetch Pathao token");
    }
});
exports.getPathaoToken = getPathaoToken;
const getCityList = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(`${exports.pathaoConfig.baseUrl}/city-list`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data.data;
});
exports.getCityList = getCityList;
const getZoneList = (cityId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(`${exports.pathaoConfig.baseUrl}/cities/${cityId}/zone-list`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data.data;
});
exports.getZoneList = getZoneList;
const getAreaList = (zoneId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(`${exports.pathaoConfig.baseUrl}/zones/${zoneId}/area-list`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data.data;
});
exports.getAreaList = getAreaList;
const getCityAndZoneByName = (cityName, zoneName, token) => __awaiter(void 0, void 0, void 0, function* () {
    const cities = yield (0, exports.getCityList)(token);
    const city = cities.find((c) => c.city_name.toLowerCase() === cityName.toLowerCase());
    if (!city)
        throw new Error(`City "${cityName}" not found`);
    const zones = yield (0, exports.getZoneList)(city.city_id, token);
    const zone = zones.find((z) => z.zone_name.toLowerCase() === zoneName.toLowerCase());
    if (!zone)
        throw new Error(`Zone "${zoneName}" not found`);
    return { cityId: city.city_id, zoneId: zone.zone_id };
});
exports.getCityAndZoneByName = getCityAndZoneByName;
const createPathaoOrderService = (orderId, cityName, zoneName, areaName // Optional
) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const order = yield order_model_1.default.findById(orderId);
    if (!order)
        throw new Error("Order not found");
    const token = yield (0, exports.getPathaoToken)();
    const { cityId, zoneId } = yield (0, exports.getCityAndZoneByName)(cityName, zoneName, token);
    let areaId = undefined;
    if (areaName) {
        try {
            const areas = yield (0, exports.getAreaList)(zoneId, token);
            const area = areas.find((a) => a.area_name.toLowerCase() === areaName.toLowerCase());
            if (area)
                areaId = area.area_id;
        }
        catch (err) {
            console.warn("Area fetch error or no area found for this zone", err);
        }
    }
    // console.log(cityId, zoneId, areaId)
    const cleanPhoneNumber = (phone) => {
        // শুধুমাত্র সংখ্যা রাখবে, সব non-digit সরাবে
        return phone.replace(/\D/g, "");
    };
    const payload = {
        store_id: exports.pathaoConfig.storeId,
        merchant_order_id: order._id,
        recipient_name: order.name,
        recipient_phone: cleanPhoneNumber(order.phone),
        recipient_address: "This order is test address",
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
        console.log(exports.pathaoConfig.baseUrl);
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
        const response = yield fetch(`${exports.pathaoConfig.baseUrl}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            const errorText = yield response.text();
            throw new Error(`Pathao API Error: ${response.status} - ${errorText}`);
        }
        const data = yield response.json();
        console.log("data", data);
    }
    catch (error) {
        console.error("Pathao order creation failed:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw error;
    }
});
exports.createPathaoOrderService = createPathaoOrderService;
