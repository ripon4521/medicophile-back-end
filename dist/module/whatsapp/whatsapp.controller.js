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
exports.sendMessageController = void 0;
const whatsapp_service_1 = require("./whatsapp.service");
/**
 * Controller function to handle sending WhatsApp messages
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>} - We do not return a Response directly here.
 */
const sendMessageController = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, message } = req.body;
    try {
      if (!phoneNumber || !message) {
        res
          .status(400)
          .json({
            success: false,
            error: "Phone number and message are required.",
          });
        return;
      }
      // Send WhatsApp message via WhatsApp Cloud API
      const result = yield (0, whatsapp_service_1.sendMessage)({
        phoneNumber,
        message,
      });
      // Send success response
      res.status(200).json({
        success: true,
        message: "Message sent successfully",
        data: result,
      });
    } catch (error) {
      console.error("❌ Error in sendMessageController:", error);
      res.status(500).json({
        success: false,
        error: error || "Something went wrong while sending message.",
      });
    }
  });
exports.sendMessageController = sendMessageController;
