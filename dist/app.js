"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./module/user/user.router"));
const auth_router_1 = __importDefault(require("./module/auth/auth.router"));
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const admin_router_1 = __importDefault(require("./module/admin/admin.router"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const feedback_router_1 = __importDefault(require("./module/feedback/feedback.router"));
const jobseeker_router_1 = __importDefault(require("./module/jobseeker/jobseeker.router"));
const skill_router_1 = __importDefault(require("./module/skill/skill.router"));
const job_router_1 = __importDefault(require("./module/job/job.router"));
const recruiter_router_1 = __importDefault(require("./module/recruiter/recruiter.router"));
const application_router_1 = __importDefault(require("./module/application/application.router"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ['http://localhost:5173', 'https://bikeshopadmin.vercel.app', 'https://bikeshopstore.vercel.app'] }));
// middleware
app.use(express_1.default.json());
app.use('/api/auth', auth_router_1.default);
app.use('/api/admin', admin_router_1.default);
app.use('/api/user', user_router_1.default);
app.use('/api/feedback', feedback_router_1.default);
app.use('/api/jobSeeker', jobseeker_router_1.default);
app.use('/api/skill', skill_router_1.default);
app.use('/api/job', job_router_1.default);
app.use('/api/recruiter', recruiter_router_1.default);
app.use('/api/application', application_router_1.default);
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Hello',
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
