import axios from "axios";

export const sendMessage = async ({ phoneNumber, message }: any) => {
  const token = "YOUR_WHATSAPP_API_TOKEN";
  const phoneNumberId = "YOUR_PHONE_NUMBER_ID";

  const url = `https://graph.facebook.com/v15.0/${phoneNumberId}/messages`;

  const data = {
    messaging_product: "whatsapp",
    to: phoneNumber, // E.g., +8801700000000
    text: { body: message },
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(url, data, config);
    console.log("📤 Message sent successfully:", response.data);
    return { status: "sent", data: response.data };
  } catch (error) {
    console.error("❌ WhatsApp Cloud API Error:", error || error);
    throw new Error("Failed to send WhatsApp message");
  }
};
