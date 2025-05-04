"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const date_fns_1 = require("date-fns");
const course_model_1 = __importDefault(require("./course.model"));
// Cron task: Every 24 hours at 2 AM BD time (Asia/Dhaka)
node_cron_1.default.schedule("0 2 * * *", () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      // Get current date and time in Bangladesh Time (Asia/Dhaka)
      const currentDateBD = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
      );
      // Fetch all active courses that are not deleted
      const activeCourses = yield course_model_1.default.find({
        status: "active",
        isDeleted: false,
      });
      for (const course of activeCourses) {
        const { duration, createdAt } = course;
        // Skip if there is no duration or createdAt date
        if (!duration || !createdAt) continue;
        // Extract the number of months from the duration (e.g., "3 months" => 3)
        const match = duration.match(/(\d+)\s*months?/i);
        if (!match) continue;
        const months = parseInt(match[1]);
        const expiryDate = (0, date_fns_1.addMonths)(
          new Date(createdAt),
          months,
        );
        // If the current date is after the expiry date, update the status to inactive
        if ((0, date_fns_1.isAfter)(currentDateBD, expiryDate)) {
          // Update course status to inactive
          yield course_model_1.default.updateOne(
            { _id: course._id },
            { $set: { status: "inactive" } },
          );
          console.log(
            `Course "${course.course_title}" set to inactive (expired).`,
          );
        }
      }
      console.log("24-hour course expiry check complete.");
    } catch (error) {
      console.error("Error during course expiry check:", error);
    }
  }),
);
