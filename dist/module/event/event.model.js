"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const EventSchema = new mongoose_1.Schema({
    event_name: { type: String, required: true, minlength: 3 },
    date: { type: Date, required: true },
    time: { type: String },
    location: { type: String, required: true, minlength: 5 },
    organizer: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true, minlength: 10 },
    registration_required: { type: Boolean, required: true },
    rsvp_count: { type: Number, required: true, min: 0 },
    contact: {
        name: { type: String, required: true, minlength: 3 },
        email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
        phone: { type: String, required: true, match: /^\+?\d{10,15}$/ },
    },
}, { timestamps: true });
exports.eventModel = mongoose_1.default.model("Events", EventSchema);
