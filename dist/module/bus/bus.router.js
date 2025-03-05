"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bus_validation_1 = require("./bus.validation");
const bus_controller_1 = require("./bus.controller");
const busRouter = express_1.default.Router();
busRouter.post('/create-bus', (0, validateRequest_1.default)(bus_validation_1.busValidations.createBusValidationSchema), bus_controller_1.busController.createBus);
busRouter.get('/', bus_controller_1.busController.getBus);
busRouter.get('/:id', bus_controller_1.busController.getBusById);
busRouter.patch('/:id', (0, validateRequest_1.default)(bus_validation_1.busValidations.updateBusValidationSchema), bus_controller_1.busController.updateBus);
busRouter.delete('/:id', bus_controller_1.busController.deleteBus);
exports.default = busRouter;
