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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const StudentUserSchema = new mongoose_1.Schema({
    role: { type: String, enum: ["student"], required: true },
    student_id: { type: String, required: true, unique: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'User',
    },
    name: { type: String, required: true },
    gmail: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    program: { type: String, },
    year_of_study: { type: Number, },
    profile_picture: { type: String },
    semester: { type: String, },
    preferences: {
        language: { type: String, },
        notification_preferences: {
            email_notifications: { type: Boolean, },
            sms_notifications: { type: Boolean, },
            push_notifications: { type: Boolean, },
        },
    },
    academic_info: {
        current_gpa: { type: Number, },
        major: { type: String, },
        minor: { type: String },
    },
    emergency_contact: {
        name: { type: String, },
        relationship: { type: String, },
        contact: { type: String, },
    },
    status: {
        type: String,
        enum: ['unblocked', 'blocked'],
        default: 'unblocked',
    },
});
StudentUserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingStudent = yield mongoose_1.default.model("Students").findOne({
            $or: [{ student_id: this.student_id }, { gmail: this.gmail }],
        });
        if (existingStudent) {
            const error = new Error("Student with this ID or Gmail already exists");
            return next(error);
        }
        next();
    });
});
StudentUserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
const StudentUserModel = mongoose_1.default.model("Students", StudentUserSchema);
exports.default = StudentUserModel;
