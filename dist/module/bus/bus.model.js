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
exports.busModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const busSchema = new mongoose_1.Schema({
    route_id: { type: String, required: false },
    route_name: { type: String, required: false },
    stops: [
        {
            stop_name: { type: String, required: false },
            arrival_time: { type: String, required: false },
            departure_time: { type: String, required: false }
        }
    ],
    bus_number: { type: String, required: false },
    driver_name: { type: String, required: false },
    contact: { type: String, required: false },
    status: { type: String, enum: ["On Time", "Delayed", "Cancelled"], required: false }
}, { timestamps: true });
exports.busModel = mongoose_1.default.model("Bus", busSchema);
