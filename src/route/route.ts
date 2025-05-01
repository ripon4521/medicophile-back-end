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
import gapsQuestionRouter from "../module/gapsQuestion/gapsQuestion.route";
import gapAnswerRoute from "../module/gapAnswer/gapAnswer.route";
import gapAttempRouter from "../module/gapsAttemp/gapAttemp.route";
import liveClassRouter from "../module/liveClass/liveClass.route";
import mediaRoute from "../module/media/media.route";
import blogCategoryRoute from "../module/blogCategory/blogController.route";
import blogRoute from "../module/blog/blog.route";
import teamRoute from "../module/team/team.route";
import blogCommentRouter from "../module/blogComment/blogComment.route";
import couponRoute from "../module/coupon/coupon.route";
import purchaseTokenRoute from "../module/purchaseToken/purchaseToken.route";
import purchaseRoute from "../module/purchase/purchase.route";
import paymentDetilsRoute from "../module/paymentDetails/paymentDetails.route";
import mcqRoute from "../module/mcq/mcq.route";
import mcqAttempRouter from "../module/mcqAttemp/mcqAttemp.route";
import bookCategoryRoute from "../module/bookCategory/bookCategory.route";
import noticeRoute from "../module/notice/notice.route";
import productRouter from "../module/product/product.route";
import courseDetailsRouter from "../module/courseDetails/courseDetails.route";
import courseReveiewRouter from "../module/courseReview/courseReview.route";

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
  },
  {
    path: "/images",
    route: imageUploadRouter,
  },
  {
    path: "/pdf",
    route: pdfRouter,
  },
  {
    path: "/cq-question",
    route: cqQuestionRouter,
  },
  {
    path: "/cq-attemp",
    route: cqAttempRouter,
  },
  {
    path: "/cq-marking",
    route: cqMarkingRouter,
  },
  {
    path: "/docs",
    route: docsRouter,
  },
  {
    path: "/gap-question",
    route: gapsQuestionRouter,
  },
  {
    path: "/gap-answer",
    route: gapAnswerRoute,
  },
  {
    path: "/gap-attemp",
    route: gapAttempRouter,
  },
  {
    path: "/live-class",
    route: liveClassRouter,
  },
  {
    path: "/media",
    route: mediaRoute,
  },
  {
    path: "/blog-category",
    route: blogCategoryRoute,
  },
  {
    path: "/blog",
    route: blogRoute,
  },
  {
    path: "/team",
    route: teamRoute,
  },
  {
    path: "/blog-comment",
    route: blogCommentRouter,
  },
  {
    path: "/coupon",
    route: couponRoute,
  },
  {
    path: "/purchase-token",
    route: purchaseTokenRoute,
  },
  {
    path: "/purchase",
    route: purchaseRoute,
  },
  {
    path: "/payment-details",
    route: paymentDetilsRoute,
  },
  {
    path: "/mcq",
    route: mcqRoute,
  },
  {
    path: "/mcq-attemp",
    route: mcqAttempRouter,
  },
  {
    path: "/product-category",
    route: bookCategoryRoute,
  },
  {
    path: "/notice",
    route: noticeRoute,
  },{
    path:"/product",
    route:productRouter
  },{
    path:'/course-details',
    route:courseDetailsRouter
  },
  {
    path:'/course-reveiw',
    route:courseReveiewRouter
  }
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
