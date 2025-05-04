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
const ExamSchema = new mongoose_1.Schema(
  {
    slug: { type: String, unique: true },
    examTitle: { type: String, required: true },
    createdBy: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    moduleId: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: "Module",
    },
    examType: {
      type: String,
      enum: ["MCQ", "CQ", "Fill in the gaps"],
      required: true,
    },
    totalQuestion: { type: Number, default: 0 },
    positiveMark: { type: Number, default: 0 },
    negativeMark: { type: Number, default: 0 },
    mcqDuration: { type: Number, default: 0 },
    cqMark: { type: Number, default: 0 },
    resultStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
    },
    validTime: { type: Date },
    status: { type: String, enum: ["published", "drafted"], required: true },
    scheduleDate: { type: Date },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, // UTC+6 (Bangladesh Time)
  },
);
ExamSchema.pre("save", function (next) {
  if (this.isModified("examTitle")) {
    const uniqueSlug = (0, generateSlug_1.generateUniqueSlug)(this.examTitle);
    this.slug = uniqueSlug;
  }
  next();
});
const ExamModel = mongoose_1.default.model("Exam", ExamSchema);
exports.default = ExamModel;
