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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPerformance = void 0;
const performance_service_1 = require("./performance.service");
const fetchPerformance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        const data = yield (0, performance_service_1.getStudentPerformance)(studentId);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching performance", error });
    }
});
exports.fetchPerformance = fetchPerformance;
