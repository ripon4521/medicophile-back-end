"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const dashboardOverview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const result = await eventService.createEventIntoDB(req.body);
    const result = {
        summary: [
            {
                name: "Total Students",
                value: "500"
            },
            {
                name: "Total Faculty",
                value: "30"
            },
            {
                name: "Active Courses",
                value: "28"
            },
            {
                name: "Total Meals",
                value: "500"
            },
            {
                name: "Upcoming Events",
                value: "5"
            },
        ],
        recentactivity: [
            {
                user: "John Doe",
                avatar: "JD",
                action: "updated the cafeteria menu",
                time: "2 minutes ago",
            },
            {
                user: "Sarah Smith",
                avatar: "SS",
                action: "added a new bus route",
                time: "15 minutes ago",
            },
            {
                user: "Michael Brown",
                avatar: "MB",
                action: "created a new event",
                time: "1 hour ago",
            },
            {
                user: "Emily Johnson",
                avatar: "EJ",
                action: "updated class schedule",
                time: "1 hour ago",
            }
        ]
    };
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Event Created Successfully",
        data: result,
    });
}));
exports.dashboardController = {
    dashboardOverview
};
