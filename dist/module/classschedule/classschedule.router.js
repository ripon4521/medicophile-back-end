"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const classschedule_controller_1 = require("./classschedule.controller");
const classscheduleRoute = express_1.default.Router();
classscheduleRoute.post('/', classschedule_controller_1.classscheduleController.createClassschedule);
classscheduleRoute.get('/', classschedule_controller_1.classscheduleController.getAllClassschedule);
classscheduleRoute.get('/:id', classschedule_controller_1.classscheduleController.getsingleClassschedule);
classscheduleRoute.patch('/:id', classschedule_controller_1.classscheduleController.updateClassschedule);
classscheduleRoute.delete("/:id", classschedule_controller_1.classscheduleController.deleteClassschedule);
exports.default = classscheduleRoute;
