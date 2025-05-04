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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const axios_1 = __importDefault(require("axios"));
const sendMessage = (_a) =>
  __awaiter(void 0, [_a], void 0, function* ({ phoneNumber, message }) {
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
      const response = yield axios_1.default.post(url, data, config);
      console.log("📤 Message sent successfully:", response.data);
      return { status: "sent", data: response.data };
    } catch (error) {
      console.error("❌ WhatsApp Cloud API Error:", error || error);
      throw new Error("Failed to send WhatsApp message");
    }
  });
exports.sendMessage = sendMessage;
