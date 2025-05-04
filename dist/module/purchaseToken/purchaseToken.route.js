"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(
  require("../../middlewares/validateRequest"),
);
const purchaseToken_validation_1 = require("./purchaseToken.validation");
const purchaseToken_controller_1 = require("./purchaseToken.controller");
const purchaseTokenRoute = (0, express_1.Router)();
purchaseTokenRoute.post(
  "/cretae-purchasetoken",
  (0, validateRequest_1.default)(
    purchaseToken_validation_1.purchaseTokenValidation
      .createPurchaseTokenSchema,
  ),
  purchaseToken_controller_1.purchaseTokenCOntroller.createPurchaseToken,
);
purchaseTokenRoute.get(
  "/",
  purchaseToken_controller_1.purchaseTokenCOntroller.getAllPurchaseToken,
);
purchaseTokenRoute.delete(
  "/delete-purchaetoken",
  purchaseToken_controller_1.purchaseTokenCOntroller.deletePurchaseToken,
);
purchaseTokenRoute.patch(
  "/update-purchasetoken",
  (0, validateRequest_1.default)(
    purchaseToken_validation_1.purchaseTokenValidation
      .updatePurchaseTokenSchema,
  ),
  purchaseToken_controller_1.purchaseTokenCOntroller.updatePurchaseToken,
);
exports.default = purchaseTokenRoute;
