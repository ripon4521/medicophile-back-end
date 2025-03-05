"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const event_validation_1 = require("./event.validation");
const event_controller_1 = require("./event.controller");
const eventRouter = express_1.default.Router();
eventRouter.post('/create-event', (0, validateRequest_1.default)(event_validation_1.eventValidations.createEventSchema), event_controller_1.eventController.createEvent);
eventRouter.get('/', event_controller_1.eventController.getEvents);
eventRouter.get('/:id', event_controller_1.eventController.getSingleEvent);
eventRouter.patch('/:id', (0, validateRequest_1.default)(event_validation_1.eventValidations.updateEventSchema), event_controller_1.eventController.updateEvent);
eventRouter.delete('/:id', event_controller_1.eventController.deleteEvent);
exports.default = eventRouter;
