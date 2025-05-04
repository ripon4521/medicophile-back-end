"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const generateSlug_1 = require("../../utils/generateSlug");
const courseSchema = new mongoose_1.Schema(
  {
    slug: { type: String, unique: true },
    cover_photo: { type: String, default: "" },
    course_title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    preOrder: { type: String, enum: ["on", "off"], required: true },
    course_type: { type: String, enum: ["online", "offline"], required: true },
    category: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: "CourseCategory",
      required: true,
    },
    createdBy: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expireTime: { type: String, required: true },
    daySchedule: { type: [String] },
    timeShedule: { type: [String] },
    price: { type: Number, required: true, min: 0 },
    offerPrice: { type: Number, default: 0 },
    takeReview: { type: String, enum: ["on", "off"], default: "on" },
    status: { type: String, enum: ["active", "inactive"], required: true },
    course_tag: { type: [String], default: [] },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, // UTC+6 (Bangladesh Time)
  },
);
courseSchema.pre("save", function (next) {
  if (this.isModified("course_title")) {
    const uniqueSlug = (0, generateSlug_1.generateUniqueSlug)(
      this.course_title,
    );
    this.slug = uniqueSlug;
  }
  next();
});
// Create Mongoose model
const courseModel = mongoose_1.default.model("Course", courseSchema);
exports.default = courseModel;
