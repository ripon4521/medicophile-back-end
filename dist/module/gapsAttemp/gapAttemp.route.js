"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gapAttemp_controller_1 = require("./gapAttemp.controller");
const gapAttempRouter = (0, express_1.Router)();
gapAttempRouter.get(
  "/",
  gapAttemp_controller_1.getAttempController.getAllGapAttemp,
);
gapAttempRouter.get(
  "/get-specificgapmark",
  gapAttemp_controller_1.getAttempController.getSpecificUserAttemp,
);
exports.default = gapAttempRouter;
