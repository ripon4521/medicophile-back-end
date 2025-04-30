"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const QREventSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    eventId: { type: String, required: true },
    createdAt: {
        type: Date,
        default: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
const qrCodeGenerateModel = mongoose_1.default.model("QREvent", QREventSchema);
exports.default = qrCodeGenerateModel;
