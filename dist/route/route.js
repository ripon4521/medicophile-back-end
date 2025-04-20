"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("../module/auth/auth.router"));
const admin_router_1 = __importDefault(require("../module/admin/admin.router"));
const user_router_1 = __importDefault(require("../module/user/user.router"));
// import studentRoute from "../module/student/student.router";
const faculty_router_1 = __importDefault(require("../module/teacher/faculty.router"));
const classschedule_router_1 = __importDefault(require("../module/classschedule/classschedule.router"));
const course_router_1 = __importDefault(require("../module/course/course.router"));
const category_route_1 = __importDefault(require("../module/category/category.route"));
const newEnrollment_route_1 = __importDefault(require("../module/newenrollment/newEnrollment.route"));
const lecture_route_1 = __importDefault(require("../module/lecture/lecture.route"));
const exam_route_1 = __importDefault(require("../module/exam/exam.route"));
const notes_router_1 = __importDefault(require("../module/notes/notes.router"));
const modules_router_1 = __importDefault(require("../module/modules/modules.router"));
const courseCategory_route_1 = __importDefault(require("../module/courseCategory/courseCategory.route"));
const moduleDetails_route_1 = __importDefault(require("../module/moduleDetails/moduleDetails.route"));
const student_router_1 = __importDefault(require("../module/student/student.router"));
const userCredentials_route_1 = __importDefault(require("../module/userCredentials/userCredentials.route"));
const imageUpload_route_1 = __importDefault(require("../module/imageUpload/imageUpload.route"));
const pdf_route_1 = __importDefault(require("../module/pdf/pdf.route"));
const classQuizeQuestion_route_1 = __importDefault(require("../module/classQuizeQuestion/classQuizeQuestion.route"));
const cqAttemp_route_1 = __importDefault(require("../module/cqAttemp/cqAttemp.route"));
const cqMarking_route_1 = __importDefault(require("../module/cqMarking/cqMarking.route"));
const docs_route_1 = __importDefault(require("../module/docs/docs.route"));
const gapsQuestion_route_1 = __importDefault(require("../module/gapsQuestion/gapsQuestion.route"));
const gapAnswer_route_1 = __importDefault(require("../module/gapAnswer/gapAnswer.route"));
const gapAttemp_route_1 = __importDefault(require("../module/gapsAttemp/gapAttemp.route"));
const liveClass_route_1 = __importDefault(require("../module/liveClass/liveClass.route"));
const media_route_1 = __importDefault(require("../module/media/media.route"));
const blogController_route_1 = __importDefault(require("../module/blogCategory/blogController.route"));
const blog_route_1 = __importDefault(require("../module/blog/blog.route"));
const team_route_1 = __importDefault(require("../module/team/team.route"));
const blogComment_route_1 = __importDefault(require("../module/blogComment/blogComment.route"));
const coupon_route_1 = __importDefault(require("../module/coupon/coupon.route"));
const purchaseToken_route_1 = __importDefault(require("../module/purchaseToken/purchaseToken.route"));
const purchase_route_1 = __importDefault(require("../module/purchase/purchase.route"));
const paymentDetails_route_1 = __importDefault(require("../module/paymentDetails/paymentDetails.route"));
const mcq_route_1 = __importDefault(require("../module/mcq/mcq.route"));
const mcqAttemp_route_1 = __importDefault(require("../module/mcqAttemp/mcqAttemp.route"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_router_1.default,
    },
    {
        path: "/admin",
        route: admin_router_1.default,
    },
    {
        path: "/user",
        route: user_router_1.default,
    },
    {
        path: "/student",
        route: student_router_1.default,
    },
    {
        path: "/faculty",
        route: faculty_router_1.default,
    },
    {
        path: "/classschedule",
        route: classschedule_router_1.default,
    },
    {
        path: "/course",
        route: course_router_1.default,
    },
    {
        path: "/category",
        route: category_route_1.default,
    },
    {
        path: "/enrollment",
        route: newEnrollment_route_1.default,
    },
    {
        path: "/lecture",
        route: lecture_route_1.default,
    },
    {
        path: "/exam",
        route: exam_route_1.default,
    },
    {
        path: "/note",
        route: notes_router_1.default,
    },
    {
        path: "/module",
        route: modules_router_1.default,
    },
    {
        path: "/courseCategory",
        route: courseCategory_route_1.default,
    },
    {
        path: "/moduleDetails",
        route: moduleDetails_route_1.default,
    },
    {
        path: "/user-credentials",
        route: userCredentials_route_1.default,
    },
    {
        path: "/images",
        route: imageUpload_route_1.default,
    },
    {
        path: "/pdf",
        route: pdf_route_1.default,
    },
    {
        path: "/cq-question",
        route: classQuizeQuestion_route_1.default,
    },
    {
        path: "/cq-attemp",
        route: cqAttemp_route_1.default,
    },
    {
        path: "/cq-marking",
        route: cqMarking_route_1.default,
    },
    {
        path: "/docs",
        route: docs_route_1.default,
    },
    {
        path: "/gap-question",
        route: gapsQuestion_route_1.default,
    },
    {
        path: "/gap-answer",
        route: gapAnswer_route_1.default,
    },
    {
        path: "/gap-attemp",
        route: gapAttemp_route_1.default,
    },
    {
        path: "/live-class",
        route: liveClass_route_1.default,
    },
    {
        path: "/media",
        route: media_route_1.default,
    },
    {
        path: "/blog-category",
        route: blogController_route_1.default,
    },
    {
        path: "/blog",
        route: blog_route_1.default,
    },
    {
        path: "/team",
        route: team_route_1.default,
    },
    {
        path: "/blog-comment",
        route: blogComment_route_1.default,
    },
    {
        path: "/coupon",
        route: coupon_route_1.default,
    }, {
        path: "/purchase-token",
        route: purchaseToken_route_1.default
    }, {
        path: "/purchase",
        route: purchase_route_1.default
    }, {
        path: "/payment-details",
        route: paymentDetails_route_1.default
    }, {
        path: "/mcq",
        route: mcq_route_1.default
    }, {
        path: "/mcq-attemp",
        route: mcqAttemp_route_1.default
    }
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
