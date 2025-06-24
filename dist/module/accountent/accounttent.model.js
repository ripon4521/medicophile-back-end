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
const mongoose_1 = __importStar(require("mongoose"));
const shopManagerSchema = new mongoose_1.Schema({
    role: {
        type: String,
        enum: ["superAdmin", "admin", "teacher", "student", "shopManager"],
        default: "shopManager",
    },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    profile_picture: { type: String, default: "" },
    status: { type: String, enum: ["Active", "Blocked"], default: "Active" },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
// ✅ Middleware: Delete হলে `deletedAt` BD Time অনুযায়ী সেট হবে
shopManagerSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();
    if ((update === null || update === void 0 ? void 0 : update.isDeleted) === true) {
        update.deletedAt = new Date(new Date().getTime() + 6 * 60 * 60 * 1000); // ✅ BD Time (UTC+6)
    }
    next();
});
const shopManagerModel = mongoose_1.default.model("ShopManager", shopManagerSchema);
exports.default = shopManagerModel;
