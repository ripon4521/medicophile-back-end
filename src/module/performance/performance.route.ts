import { Router } from "express";
import { fetchPerformance } from "./performance.controller";

const performanceRoute = Router();
performanceRoute.get("/:id", fetchPerformance);

export default performanceRoute;
