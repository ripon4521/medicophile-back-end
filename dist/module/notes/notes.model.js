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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const NotesSchema = new mongoose_1.Schema(
  {
    slug: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moduleId: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    courseId: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    noteFile: { type: String },
    status: {
      type: String,
      enum: ["Published", "Drafted"],
      required: true,
      default: "Published",
    },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, // UTC+6 (Bangladesh Time)
  },
);
NotesSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = (0, slugify_1.default)(this.title, {
      lower: true,
      strict: true,
    });
  }
  next();
});
NotesSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update === null || update === void 0 ? void 0 : update.title) {
    update.slug = (0, slugify_1.default)(update.title, {
      lower: true,
      strict: true,
    });
  }
  next();
});
const NotesModel = mongoose_1.default.model("Notes", NotesSchema);
exports.default = NotesModel;
