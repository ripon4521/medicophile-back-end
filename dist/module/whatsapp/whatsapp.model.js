"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const whatsappSchema = new mongoose_1.default.Schema({
  phoneNumber: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["sent", "failed"], default: "sent" },
  sentAt: { type: Date, default: Date.now },
});
const whatsappModel = mongoose_1.default.model(
  "WhatsAppMessage",
  whatsappSchema,
);
exports.default = whatsappModel;
