import axios from "axios";

export const STORE_ID = "264465";
const CLIENT_ID = "7N1aMJQbWm";
const CLIENT_SECRET = "wRcaibZkUdSNz2EI9ZyuXLlNrnAv0TdPUPXMnD39";

let accessToken = "";
let tokenExpiry = 0;

export const getPathaoToken = async (): Promise<string> => {
  if (accessToken && Date.now() < tokenExpiry) return accessToken;

  const response = await axios.post("https://api-hermes.pathao.com/aladdin/api/v1/issue-token", {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  accessToken = response.data.token;
  tokenExpiry = Date.now() + 3600 * 1000; // expires in 1hr
  return accessToken;
};







// pathao/pathao.helper.ts


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
