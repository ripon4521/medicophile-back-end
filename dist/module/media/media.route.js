"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const media_validation_1 = require("./media.validation");
const media_controller_1 = require("./media.controller");
const mediaRoute = (0, express_1.Router)();
mediaRoute.post("/create-media", (0, validateRequest_1.default)(media_validation_1.mediaValidation.createMediaZodSchema), media_controller_1.mediaController.createMedia);
mediaRoute.get("/", media_controller_1.mediaController.getAllMedia);
mediaRoute.get("/:slug", media_controller_1.mediaController.getSingleMedia);
mediaRoute.patch("/:slug", (0, validateRequest_1.default)(media_validation_1.mediaValidation.updateMediaZodSchema), media_controller_1.mediaController.updateMedia);
mediaRoute.delete("/:slug", media_controller_1.mediaController.deleteMedia);
exports.default = mediaRoute;
