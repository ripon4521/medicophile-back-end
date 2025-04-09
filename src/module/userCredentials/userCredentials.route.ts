import { Router } from "express";
import { userCredentialsController } from "./userCredentials.controller";

const userCredentialsRoute = Router();
userCredentialsRoute.get("/", userCredentialsController.getAllCredentials);
userCredentialsRoute.get(
  "/:id",
  userCredentialsController.getSingleCredentials,
);

export default userCredentialsRoute;
