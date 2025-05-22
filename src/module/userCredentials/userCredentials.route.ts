import { Router } from "express";
import { userCredentialsController } from "./userCredentials.controller";
import { auth } from "../../middlewares/auth";

const userCredentialsRoute = Router();
userCredentialsRoute.get(
  "/",
  // auth.authUser("admin"),
  userCredentialsController.getAllCredentials,
);
userCredentialsRoute.get(
  "/:id",
  userCredentialsController.getSingleCredentials,
);
userCredentialsRoute.delete('/', userCredentialsController.deleteCredintials)

export default userCredentialsRoute;
