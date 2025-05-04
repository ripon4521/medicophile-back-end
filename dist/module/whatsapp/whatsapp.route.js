"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const whatsapp_validation_1 = require("./whatsapp.validation");
const whatsapp_controller_1 = require("./whatsapp.controller");
const whatsapp_service_1 = require("./whatsapp.service");
const whatsAppRouter = express_1.default.Router();
// API route to send WhatsApp message
whatsAppRouter.post("/send-whatsapp", (0, validateRequest_1.default)(whatsapp_validation_1.whatsappMessageSchema), whatsapp_controller_1.sendMessageController);
// Webhook route to handle incoming WhatsApp messages
whatsAppRouter.post("/webhook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const incomingMessage = req.body;
    console.log("📩 Incoming WhatsApp Message:", incomingMessage);
    const message = (_e = (_d = (_c = (_b = (_a = incomingMessage === null || incomingMessage === void 0 ? void 0 : incomingMessage.entry[0]) === null || _a === void 0 ? void 0 : _a.changes[0]) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.messages[0]) === null || _d === void 0 ? void 0 : _d.text) === null || _e === void 0 ? void 0 : _e.body;
    const sender = (_j = (_h = (_g = (_f = incomingMessage === null || incomingMessage === void 0 ? void 0 : incomingMessage.entry[0]) === null || _f === void 0 ? void 0 : _f.changes[0]) === null || _g === void 0 ? void 0 : _g.value) === null || _h === void 0 ? void 0 : _h.messages[0]) === null || _j === void 0 ? void 0 : _j.from;
    if (message) {
        console.log(`Received message from ${sender}: ${message}`);
        // Send automatic reply
        const reply = `Thank you for your message: "${message}"`;
        yield (0, whatsapp_service_1.sendMessage)({ phoneNumber: sender, message: reply });
    }
    res.status(200).send("EVENT_RECEIVED");
}));
exports.default = whatsAppRouter;
