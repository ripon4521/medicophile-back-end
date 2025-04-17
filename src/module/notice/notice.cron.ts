// src/modules/notice/notice.cron.ts
import cron from "node-cron";
import NoticeModel from "./notice.model";

// Run once a day at 12:00 AM
cron.schedule("0 0 * * *", async () => {
  try {
    const currentDate = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);

    const result = await NoticeModel.updateMany(
      { expiresAt: { $lte: currentDate }, isExpire: false },
      { isExpire: true },
    );

    console.log(
      `🕛 Cron Job Executed - Expired Notices Updated: ${result.modifiedCount}`,
    );
  } catch (error) {
    console.error("❌ Cron Job Error:", error);
  }
});
