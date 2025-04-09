"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("../module/auth/auth.router"));
const admin_router_1 = __importDefault(require("../module/admin/admin.router"));
const user_router_1 = __importDefault(require("../module/user/user.router"));
// import studentRoute from "../module/student/student.router";
const faculty_router_1 = __importDefault(
  require("../module/teacher/faculty.router"),
);
const classschedule_router_1 = __importDefault(
  require("../module/classschedule/classschedule.router"),
);
const course_router_1 = __importDefault(
  require("../module/course/course.router"),
);
const category_route_1 = __importDefault(
  require("../module/category/category.route"),
);
const newEnrollment_route_1 = __importDefault(
  require("../module/newenrollment/newEnrollment.route"),
);
const lecture_route_1 = __importDefault(
  require("../module/lecture/lecture.route"),
);
const exam_route_1 = __importDefault(require("../module/exam/exam.route"));
const notes_router_1 = __importDefault(require("../module/notes/notes.router"));
const modules_router_1 = __importDefault(
  require("../module/modules/modules.router"),
);
const courseCategory_route_1 = __importDefault(
  require("../module/courseCategory/courseCategory.route"),
);
const moduleDetails_route_1 = __importDefault(
  require("../module/moduleDetails/moduleDetails.route"),
);
const student_router_1 = __importDefault(
  require("../module/student/student.router"),
);
const userCredentials_route_1 = __importDefault(
  require("../module/userCredentials/userCredentials.route"),
);
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
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
exports.default = router;
