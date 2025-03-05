"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("../module/auth/auth.router"));
const admin_router_1 = __importDefault(require("../module/admin/admin.router"));
const user_router_1 = __importDefault(require("../module/user/user.router"));
const bus_router_1 = __importDefault(require("../module/bus/bus.router"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_router_1.default,
    },
    {
        path: '/admin',
        route: admin_router_1.default
    },
    {
        path: '/user',
        route: user_router_1.default
    },
    {
        path: '/bus',
        route: bus_router_1.default
    }
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
