"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./route/route"));
const auth_1 = require("./middlewares/auth");
const onlySuperAdmin_1 = require("./DB/onlySuperAdmin");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(
  (0, cors_1.default)({
    origin: [
      "http://localhost:5173",
      "iconadmissionaid.com",
      "admin.iconadmissionaid.com ",
    ],
  }),
);
// middleware
app.use(express_1.default.json());
// router.use(  auth.authUser('admin'), onlySuperAdmin);
app.use("/api/v1", route_1.default);
const getAcontroller = (req, res) => {
  res.send("🚀 Welcome SuperAdmin to the School Management System");
};
app.get(
  "/",
  auth_1.auth.authUser("superAdmin"),
  onlySuperAdmin_1.onlySuperAdmin,
  getAcontroller,
);
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
