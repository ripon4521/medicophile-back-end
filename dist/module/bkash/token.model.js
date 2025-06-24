"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Mongoose schema
const TokenSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
    },
    isExpire: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
// Mongoose model
const TokenModel = (0, mongoose_1.model)('Token', TokenSchema);
exports.default = TokenModel;
