import express from "express";
import { classscheduleController } from "./classschedule.controller";

const classscheduleRoute = express.Router();
classscheduleRoute.post("/", classscheduleController.createClassschedule);
classscheduleRoute.get("/", classscheduleController.getAllClassschedule);
classscheduleRoute.get("/:id", classscheduleController.getsingleClassschedule);
classscheduleRoute.patch("/:id", classscheduleController.updateClassschedule);
classscheduleRoute.delete("/:id", classscheduleController.deleteClassschedule);

export default classscheduleRoute;
