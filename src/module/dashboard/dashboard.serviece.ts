import { ExpenseModel } from "../accounts/expense.model";
import { IncomeModel } from "../accounts/income.model";
import courseModel from "../course/course.model";
import { PurchaseModel } from "../purchase/purchase.model";
import { UserModel } from "../user/user.model";

// In-memory snapshot
let lastStats = {
  studentCount: 0,
  teacherCount: 0,
  courseCount: 0,
  totalExpense: 0,
  totalRevenue: 0,
};

export const getDashboardStats = async () => {
  const [studentCount, teacherCount, courseCount, totalExpenseData, totalRevenueData] = await Promise.all([
    UserModel.countDocuments({ role: "student", isDeleted: false }),
    UserModel.countDocuments({ role: "teacher", isDeleted: false }),
    courseModel.countDocuments({ isDeleted: false }),
    ExpenseModel.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ]),
    IncomeModel.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ])
  ]);

  const totalExpense = totalExpenseData[0]?.totalAmount || 0;
  const totalRevenue = totalRevenueData[0]?.totalAmount || 0;

  const monthlyStats = await PurchaseModel.aggregate([
    {
      $match: { isDeleted: false, paymentStatus: "Paid" },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalStudents: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  const formattedStats = monthlyStats.map((item) => {
    const date = new Date(item._id.year, item._id.month - 1);
    return {
      month: date.toLocaleString("default", { month: "long", year: "numeric" }),
      totalStudents: item.totalStudents,
    };
  });

  // Update memory
  lastStats = {
    studentCount,
    teacherCount,
    courseCount,
    totalExpense,
    totalRevenue,
  };

  return {
    studentCount,
    teacherCount,
    courseCount,
    totalExpense,
    totalRevenue,
    monthlyStats: formattedStats,
  };
};

export const getDashboardChangeMessages = (currentStats: {
  studentCount: number;
  teacherCount: number;
  courseCount: number;
  totalExpense: number;
  totalRevenue: number;
}) => {
  const messages: string[] = [];

  if (currentStats.studentCount > lastStats.studentCount) messages.push("New student(s) joined.");
  if (currentStats.teacherCount > lastStats.teacherCount) messages.push("New teacher(s) added.");
  if (currentStats.courseCount > lastStats.courseCount) messages.push("New course(s) created.");
  if (currentStats.totalExpense > lastStats.totalExpense) messages.push("New expense(s) recorded.");
  if (currentStats.totalRevenue > lastStats.totalRevenue) messages.push("New income(s) added.");

  return messages;
};

export const dashboardStatusService = {
  getDashboardStats,
  getDashboardChangeMessages,
};
