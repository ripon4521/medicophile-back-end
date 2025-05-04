"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const generateReferLink_validation_1 = require("./generateReferLink.validation");
const generateReferLink_controller_1 = require("./generateReferLink.controller");
const referalLinkRouter = express_1.default.Router();
referalLinkRouter.post("/generate-refer-link", (0, validateRequest_1.default)(generateReferLink_validation_1.IReferralSchema), generateReferLink_controller_1.referallinkController.createReferalLink);
referalLinkRouter.get("/", generateReferLink_controller_1.referallinkController.getAllRferLink);
exports.default = referalLinkRouter;
