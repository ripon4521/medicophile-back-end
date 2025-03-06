"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const canteenstaff_controller_1 = require("./canteenstaff.controller");
const canteenstaff_validation_1 = require("./canteenstaff.validation");
const canteenstaffRoute = express_1.default.Router();
canteenstaffRoute.get('/', canteenstaff_controller_1.canteenstaffsController.getAllCanteenstaff);
canteenstaffRoute.get('/:id', canteenstaff_controller_1.canteenstaffsController.getSingleCanteenstaff);
canteenstaffRoute.patch('/:id', (0, validateRequest_1.default)(canteenstaff_validation_1.canteenstaffValidation.updatecanteenstaffValidationSchema), canteenstaff_controller_1.canteenstaffsController.updatedCanteenstaff);
canteenstaffRoute.delete("/:id", canteenstaff_controller_1.canteenstaffsController.deleteCanteenstaff);
exports.default = canteenstaffRoute;
