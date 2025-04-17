import cron from "node-cron";
import { addMonths, isAfter } from "date-fns";
import courseModel from "./course.model";

// Cron task: Every 24 hours at 2 AM BD time (Asia/Dhaka)
cron.schedule("0 2 * * *", async () => {
  try {
    // Get current date and time in Bangladesh Time (Asia/Dhaka)
    const currentDateBD = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
    );

    // Fetch all active courses that are not deleted
    const activeCourses = await courseModel.find({
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
      const expiryDate = addMonths(new Date(createdAt), months);

      // If the current date is after the expiry date, update the status to inactive
      if (isAfter(currentDateBD, expiryDate)) {
        // Update course status to inactive
        await courseModel.updateOne(
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
});
