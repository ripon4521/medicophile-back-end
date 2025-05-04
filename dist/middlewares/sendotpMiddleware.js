"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios");
const sendOtpMiddleware = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
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
      const response = yield axios.post(
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
  });
module.exports = sendOtpMiddleware;
