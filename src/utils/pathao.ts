import axios from "axios";

export const STORE_ID = "264465";
const CLIENT_ID = "7N1aMJQbWm";
const CLIENT_SECRET = "wRcaibZkUdSNz2EI9ZyuXLlNrnAv0TdPUPXMnD39";

let accessToken = "";
let tokenExpiry = 0;

export const getPathaoToken = async (): Promise<string> => {
  try {
    // Check if token exists and not expired
    if (accessToken && Date.now() < tokenExpiry) {
      return accessToken;
    }

    // Request new token
    const response = await axios.post(
      "https://api-hermes.pathao.com/aladdin/api/v1/issue-token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.data || !response.data.token) {
      throw new Error("Failed to get token from Pathao");
    }

    accessToken = response.data.token;
    tokenExpiry = Date.now() + 3600 * 1000; // 1 hour expiry

    return accessToken;
  } catch (error: any) {
    console.error("Error fetching Pathao token:", error.response?.data || error.message || error);
    throw new Error("Could not fetch Pathao token");
  }
};
