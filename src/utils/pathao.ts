import axios from 'axios';

export const STORE_ID = "264465";
const CLIENT_ID = "7N1aMJQbWm";
const CLIENT_SECRET = "wRcaibZkUdSNz2EI9ZyuXLlNrnAv0TdPUPXMnD39";
const USERNAME = "test@pathao.com"; // Sandbox credentials
const PASSWORD = "lovePathao";      // Sandbox credentials

let accessToken = "";
let tokenExpiry = 0;

export const getPathaoToken = async (): Promise<string> => {
  try {
    if (accessToken && Date.now() < tokenExpiry) {
      return accessToken;
    }

    const response = await axios.post(
      "https://courier-api-sandbox.pathao.com/aladdin/api/v1/issue-token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "password",
        username: USERNAME,
        password: PASSWORD,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.data || !response.data.access_token) {
      throw new Error("Failed to get token from Pathao");
    }

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + 3600 * 1000;

    return accessToken;
  } catch (error: any) {
    console.error("Error fetching Pathao token:", error.response?.data || error.message);
    throw new Error("Could not fetch Pathao token");
  }
};
