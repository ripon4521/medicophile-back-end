// src/modules/exam/exam.cron.ts
import cron from "node-cron";
import ExamModel from "./exam.model";



cron.schedule("0 0 * * *", async () => {
    try {
      const currentDate = new Date(new Date().getTime() + 6 * 60 * 60 * 1000); 
  
      const result = await ExamModel.updateMany(
        {
          validTime: { $lte: currentDate },
          status: "published",
          isDeleted: false,
        },
        { status: "drafted" }
      );
      console.log(`🕛 Drafted ${result.modifiedCount} expired exams`);
    } catch (error) {
      console.error("❌ Cron Error:", error);
    }
  });
  
