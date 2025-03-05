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
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventService = void 0;
const event_model_1 = require("./event.model");
const createEventIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.eventModel.create(payload);
    return result;
});
const getAllEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.eventModel.find();
    return result;
});
const getEventById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.eventModel.findOne({ _id });
    return result;
});
const updateEventById = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.eventModel.findOneAndUpdate({ _id }, payload, { new: true });
    return result;
});
const deleteEventById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.eventModel.findOneAndUpdate({ _id });
    return result;
});
exports.eventService = {
    createEventIntoDB,
    getAllEvents,
    getEventById,
    updateEventById,
    deleteEventById,
};
