import cron from "node-cron";
import { addDays, addMonths, addYears, isAfter } from "date-fns";
import { PurchaseModel } from "./purchase.model";


// Run every 6 hours
cron.schedule("0 */6 * * *", async () => {
  try {
    const currentBDTime = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
    );

    const purchases = await PurchaseModel.find({
      isDeleted: false,
      isExpire: false,
    }).populate("courseId");

    for (const purchase of purchases) {
      // Check if courseId is populated properly
      if (typeof purchase.courseId === "object" && "expireTime" in purchase.courseId) {
        const course: any = purchase.courseId;

        if (!purchase.createdAt || !course.expireTime) continue;

        const match = course.expireTime.match(/(\d+)\s*(day|month|year)s?/i);
        if (!match) continue;

        const value = parseInt(match[1]);
        const unit = match[2].toLowerCase();

        let expiryDate: Date;

        if (unit === "day") {
          expiryDate = addDays(new Date(purchase.createdAt), value);
        } else if (unit === "month") {
          expiryDate = addMonths(new Date(purchase.createdAt), value);
        } else if (unit === "year") {
          expiryDate = addYears(new Date(purchase.createdAt), value);
        } else {
          continue;
        }

        if (isAfter(currentBDTime, expiryDate)) {
          await PurchaseModel.updateOne(
            { _id: purchase._id },
            { $set: { isExpire: true } }
          );
          console.log(`✅ Marked expired: ${course.course_title}`);
        }
      }
    }

    console.log("✅ Purchase expiry cron completed.");
  } catch (err) {
    console.error("❌ Cron error:", err);
  }
});
