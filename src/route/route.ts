import { Router } from "express";
import authRouter from "../module/auth/auth.router";
import adminRouter from "../module/admin/admin.router";
import userRouter from "../module/user/user.router";
// import studentRoute from "../module/student/student.router";
import facultRoute from "../module/teacher/faculty.router";
import classscheduleRoute from "../module/classschedule/classschedule.router";
import courseRouter from "../module/course/course.router";
import categiryRouter from "../module/category/category.route";
import enrollmentRoute from "../module/newenrollment/newEnrollment.route";
import lectureRouter from "../module/lecture/lecture.route";
import examRouter from "../module/exam/exam.route";
import noteRouter from "../module/notes/notes.router";
import moduleRouter from "../module/modules/modules.router";
import courseCategoryRoute from "../module/courseCategory/courseCategory.route";
import moduleDetailsRouter from "../module/moduleDetails/moduleDetails.route";
import studentRoute from "../module/student/student.router";
import userCredentialsRoute from "../module/userCredentials/userCredentials.route";
import imageUploadRouter from "../module/imageUpload/imageUpload.route";
import pdfRouter from "../module/pdf/pdf.route";
import cqQuestionRouter from "../module/classQuizeQuestion/classQuizeQuestion.route";
import cqAttempRouter from "../module/cqAttemp/cqAttemp.route";
import cqMarkingRouter from "../module/cqMarking/cqMarking.route";
import docsRouter from "../module/docs/docs.route";

const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/admin",
    route: adminRouter,
  },

  {
    path: "/user",
    route: userRouter,
  },

  {
    path: "/student",
    route: studentRoute,
  },
  {
    path: "/faculty",
    route: facultRoute,
  },
  {
    path: "/classschedule",
    route: classscheduleRoute,
  },
  {
    path: "/course",
    route: courseRouter,
  },
  {
    path: "/category",
    route: categiryRouter,
  },
  {
    path: "/enrollment",
    route: enrollmentRoute,
  },
  {
    path: "/lecture",
    route: lectureRouter,
  },
  {
    path: "/exam",
    route: examRouter,
  },
  {
    path: "/note",
    route: noteRouter,
  },
  {
    path: "/module",
    route: moduleRouter,
  },
  {
    path: "/courseCategory",
    route: courseCategoryRoute,
  },
  {
    path: "/moduleDetails",
    route: moduleDetailsRouter,
  },
  {
    path: "/user-credentials",
    route: userCredentialsRoute,
  },{
    path:'/images',
    route:imageUploadRouter
  },{
    path:'/pdf',
    route:pdfRouter
  },{
    path:'/cq-question',
    route:cqQuestionRouter
  },{
    path:'/cq-attemp',
    route:cqAttempRouter
  },{
    path:'/cq-marking',
    route:cqMarkingRouter 
  },{
    path:'/docs',
    route:docsRouter
  }
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
