import { Router } from "express";
import authRouter from "../module/auth/auth.router";
import adminRouter from "../module/admin/admin.router";
import userRouter from "../module/user/user.router";
import busRouter from "../module/bus/bus.router";
import canteenstaffRoute from "../module/canteenstaff/canteenstaff.router";
import studentRoute from "../module/student/student.router";
import facultRoute from "../module/faculty/faculty.router";
import classscheduleRoute from "../module/classschedule/classschedule.router";
import courseRouter from "../module/course/course.router";


const router = Router();
const moduleRoutes = [

    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/admin',
        route: adminRouter
    },
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/bus',
        route: busRouter
    },
    {
        path: '/canteenstaff',
        route: canteenstaffRoute
    },
    {
        path: '/student',
        route: studentRoute
    },
    {
        path: '/faculty',
        route: facultRoute
    },
    {
        path: '/classschedule',
        route: classscheduleRoute
    },
    {
        path: '/course',
        route: courseRouter
    }

];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;