"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userCredentials_controller_1 = require("./userCredentials.controller");
const auth_1 = require("../../middlewares/auth");
const userCredentialsRoute = (0, express_1.Router)();
userCredentialsRoute.get("/", auth_1.auth.authUser("admin"), userCredentials_controller_1.userCredentialsController.getAllCredentials);
userCredentialsRoute.get("/:id", userCredentials_controller_1.userCredentialsController.getSingleCredentials);
exports.default = userCredentialsRoute;
