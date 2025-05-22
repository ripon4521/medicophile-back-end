import cron from "node-cron";
import { addDays, addMonths, addYears, isAfter } from "date-fns";
import courseModel from "./course.model";

// Cron task: Every 12 hours at minute 0 (i.e., 2 AM & 2 PM BD time approx.)
cron.schedule("0 */12 * * *", async () => {
  try {
    const currentDateBD = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
    );

    const activeCourses = await courseModel.find({
      status: "active",
      isDeleted: false,
    });

    for (const course of activeCourses) {
      const { duration, createdAt } = course;
      if (!duration || !createdAt) continue;

      const match = duration.match(/(\d+)\s*(day|month|year)s?/i);
      if (!match) continue;

      const amount = parseInt(match[1]);
      const unit = match[2].toLowerCase();

      let expiryDate: Date;

      if (unit === "day") {
        expiryDate = addDays(new Date(createdAt), amount);
      } else if (unit === "month") {
        expiryDate = addMonths(new Date(createdAt), amount);
      } else if (unit === "year") {
        expiryDate = addYears(new Date(createdAt), amount);
      } else {
        continue; // Unknown unit
      }

      if (isAfter(currentDateBD, expiryDate)) {
        await courseModel.updateOne(
          { _id: course._id },
          { $set: { status: "inactive" } }
        );
        console.log(`Course "${course.course_title}" set to inactive (expired).`);
      }
    }

    console.log("12-hour course expiry check complete.");
  } catch (error) {
    console.error("Error during course expiry check:", error);
  }
});
