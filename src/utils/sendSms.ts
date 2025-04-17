import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendSMS = async (phone: string, message: string) => {
  const token = process.env.GREENWEB_API_TOKEN;

  const url = `http://api.greenweb.com.bd/api.php`;
  const payload = {
    token: token,
    to: phone,
    message: message,
  };

  try {
    const response = await axios.get(url, { params: payload });
    // console.log("SMS sent response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("SMS sending failed:", error?.response?.data || error.message);
    throw new Error("SMS sending failed");
  }
};
