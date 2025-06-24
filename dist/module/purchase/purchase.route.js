"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchase_validation_1 = require("./purchase.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const purcahase_controller_1 = require("./purcahase.controller");
const auth_1 = require("../../middlewares/auth");
const purchaseRoute = (0, express_1.Router)();
purchaseRoute.get('/stats', (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "superAdmin"), purcahase_controller_1.purchaseController.getPurchaseStats);
purchaseRoute.post("/create-purchase", (0, validateRequest_1.default)(purchase_validation_1.purchaseValidation.createPurchaseSchema), purcahase_controller_1.purchaseController.createPurchase);
purchaseRoute.get("/", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "superAdmin"), purcahase_controller_1.purchaseController.getAllPurchase);
purchaseRoute.patch("/:id", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "superAdmin"), (0, validateRequest_1.default)(purchase_validation_1.purchaseValidation.updatePurchaseSchema), purcahase_controller_1.purchaseController.updatePurchase);
purchaseRoute.delete("/:id", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "superAdmin"), purcahase_controller_1.purchaseController.deletePurchase);
exports.default = purchaseRoute;
