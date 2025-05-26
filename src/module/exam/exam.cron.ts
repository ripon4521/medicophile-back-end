// // src/modules/exam/exam.cron.ts
// import cron from "node-cron";
// import { addDays, addMonths, addYears, isAfter } from "date-fns";
// import ExamModel from "./exam.model";

// // Cron: Every 12 hours (Midnight & Noon BD time)
// cron.schedule("0 */12 * * *", async () => {
//   try {
//     const currentDateBD = new Date(
//       new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
//     );

//     const publishedExams = await ExamModel.find({
//       status: "published",
//       isDeleted: false,
//     });

//     for (const exam of publishedExams) {
//       const { validTime, createdAt } = exam;
//       if (!validTime || !createdAt) continue;

//       const match = validTime.match(/(\d+)\s*(day|month|year)s?/i);
//       if (!match) continue;

//       const amount = parseInt(match[1]);
//       const unit = match[2].toLowerCase();

//       let expiryDate: Date;
//       if (unit === "day") {
//         expiryDate = addDays(new Date(createdAt), amount);
//       } else if (unit === "month") {
//         expiryDate = addMonths(new Date(createdAt), amount);
//       } else if (unit === "year") {
//         expiryDate = addYears(new Date(createdAt), amount);
//       } else {
//         continue;
//       }

//       if (isAfter(currentDateBD, expiryDate)) {
//         await ExamModel.updateOne(
//           { _id: exam._id },
//           { $set: { status: "drafted" } }
//         );
//         console.log(`📄 Exam "${exam.examTitle || exam._id}" drafted (expired).`);
//       }
//     }

//     console.log("✅ 12-hour exam expiry check complete.");
//   } catch (error) {
//     console.error("❌ Exam Cron Error:", error);
//   }
// });
