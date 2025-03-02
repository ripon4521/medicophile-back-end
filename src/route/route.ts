import { Router } from "express";
import authRouter from "../module/auth/auth.router";
import adminRouter from "../module/admin/admin.router";
import userRouter from "../module/user/user.router";


const router = Router();
const moduleRoutes = [
    {
    path: '/auth',
    route: authRouter, 
   
    },{
          path:'/admin',
          route: adminRouter
    },{
        path : '/user',
        route: userRouter
    }
  

];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

export default router;