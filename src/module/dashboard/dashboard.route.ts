import { Router } from "express";
import { getDashboardStats } from "./dashboard.serviece";
import { dashboardStatsController } from "./dashboard.controller";

const dashboardRoute = Router();
dashboardRoute.get('/dashboard', dashboardStatsController.getDashboardStats);
dashboardRoute.get('/message', dashboardStatsController.getDashboardMessage);
export default dashboardRoute;