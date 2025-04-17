import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { teamValidation } from "./team.validation";
import { teamController } from "./team.controller";

const teamRoute = Router();
teamRoute.post(
  "/create-team",
  validateRequest(teamValidation.createTeamSchema),
  teamController.createTeam,
);
teamRoute.get("/", teamController.getAllTeam);
teamRoute.get("/:slug", teamController.getSingleTeam);
teamRoute.patch(
  "/:slug",
  validateRequest(teamValidation.updateTeamSchema),
  teamController.updateTeam,
);
teamRoute.delete("/:slug", teamController.deleteTeam);
export default teamRoute;
