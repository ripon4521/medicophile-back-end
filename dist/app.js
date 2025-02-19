"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./module/user/user.router"));
const auth_router_1 = __importDefault(require("./module/auth/auth.router"));
const blog_router_1 = __importDefault(require("./module/blog/blog.router"));
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const admin_router_1 = __importDefault(require("./module/admin/admin.router"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const product_routes_1 = require("./module/product/product.routes");
const order_routes_1 = require("./module/order/order.routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const category_routes_1 = require("./module/category/category.routes");
const auth_1 = __importDefault(require("./middlewares/auth"));
const user_constants_1 = require("./module/user/user.constants");
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
app.use('/api/blogs', blog_router_1.default);
app.use('/api/products', product_routes_1.ProductRoutes);
app.use('/api/order', (0, auth_1.default)(user_constants_1.USER_ROLE === null || user_constants_1.USER_ROLE === void 0 ? void 0 : user_constants_1.USER_ROLE.user, user_constants_1.USER_ROLE.admin), order_routes_1.OrderRoutes);
app.use('/api/categorys', category_routes_1.CategoryRoutes);
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Hello',
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
