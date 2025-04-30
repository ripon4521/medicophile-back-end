import { NextFunction, Request, Response } from "express";

const axios = require("axios");

const sendOtpMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const phoneNumber = req.body.phone; // Login form থেকে phone number নিবে

    if (!phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is required" });
    }

    // Random 6 digit OTP generate
    const otp = Math.floor(100000 + Math.random() * 900000);

    req.generatedOtp = otp;
    req.phoneNumber = phoneNumber;

    // SMS পাঠানো
    const postData = new URLSearchParams({
      token: "your-token-here",
      to: phoneNumber,
      message: `Your OTP is: ${otp}`,
    }).toString();

    const response = await axios.post(
      "https://api.bdbulksms.net/api.php",
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    console.log("SMS Sent:", response.data);

    next(); // OTP পাঠানো শেষ, এখন পরবর্তী login process এ যাও
  } catch (error) {
    console.error("OTP send error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

module.exports = sendOtpMiddleware;
