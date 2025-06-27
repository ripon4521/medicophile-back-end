import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { dashboardStatusService } from "./dashboard.serviece";

// ✅ Dashboard data fetch API
const getDashboardStats = catchAsync(async (req, res) => {
  const result = await dashboardStatusService.getDashboardStats();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Dashboard stats fetched successfully",
    data: result,
  });
});

// ✅ Dashboard change messages API
const getDashboardMessage = catchAsync(async (req, res) => {
  const stats = await dashboardStatusService.getDashboardStats(); // এটা লাগবেই আগের data update + compare করতে
  const messages = dashboardStatusService.getDashboardChangeMessages(stats);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Dashboard change messages fetched successfully",
    data: messages,
  });
});

export const dashboardStatsController = {
  getDashboardStats,
  getDashboardMessage,
};
