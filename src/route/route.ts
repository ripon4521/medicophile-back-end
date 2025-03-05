import { Router } from "express";
import authRouter from "../module/auth/auth.router";
import adminRouter from "../module/admin/admin.router";
import userRouter from "../module/user/user.router";
import busRouter from "../module/bus/bus.router";
import eventRouter from '../module/event/event.router';
import studentRoute from "../module/student/student.router";
import mealRouter from "../module/meal/meal.router";
import preOrderRouter from "../module/preorder/preorder.router";
import courseRouter from "../module/course/course.router";


const router = Router();
const moduleRoutes = [
    {
    path: '/auth',
    route: authRouter, 
   
    },{
          path:'/student',
          route: studentRoute
    },{
        path : '/user',
        route: userRouter
    },{
        path:'/bus',
        route:busRouter
    },
    {
        path:'/event',
        route:eventRouter
    },{
        path:'/meal',
        route:mealRouter
    },{
        path:'/preOrder',
        route:preOrderRouter
    },{
        path:'/course',
        route:courseRouter
    }
  

];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

export default router;