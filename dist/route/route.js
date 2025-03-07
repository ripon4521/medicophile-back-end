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
const student_router_1 = __importDefault(require("../module/student/student.router"));
const meal_router_1 = __importDefault(require("../module/meal/meal.router"));
const canteenstaff_router_1 = __importDefault(require("../module/canteenstaff/canteenstaff.router"));
const faculty_router_1 = __importDefault(require("../module/faculty/faculty.router"));
const classschedule_router_1 = __importDefault(require("../module/classschedule/classschedule.router"));
const course_router_1 = __importDefault(require("../module/course/course.router"));
const preorder_router_1 = __importDefault(require("../module/preorder/preorder.router"));
const event_router_1 = __importDefault(require("../module/event/event.router"));
const dashboard_router_1 = __importDefault(require("../module/dashboard/dashboard.router"));
const research_router_1 = __importDefault(require("../module/research/research.router"));
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
        path: '/dashboard',
        route: dashboard_router_1.default
    },
    {
        path: '/user',
        route: user_router_1.default
    },
    {
        path: '/bus',
        route: bus_router_1.default
    }, {
        path: '/student',
        route: student_router_1.default
    }, {
        path: '/meal',
        route: meal_router_1.default
    },
    {
        path: '/canteenstaff',
        route: canteenstaff_router_1.default
    },
    {
        path: '/student',
        route: student_router_1.default
    },
    {
        path: '/faculty',
        route: faculty_router_1.default
    },
    {
        path: '/classschedule',
        route: classschedule_router_1.default
    },
    {
        path: '/course',
        route: course_router_1.default
    },
    {
        path: '/preOrder',
        route: preorder_router_1.default
    },
    {
        path: '/events',
        route: event_router_1.default
    },
    {
        path: '/research',
        route: research_router_1.default
    }
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
