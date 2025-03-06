"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultysService = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const faculty_model_1 = __importDefault(require("./faculty.model"));
const user_model_1 = require("../user/user.model");
const getAllFacultys = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.default.find().populate('user');
    return result;
});
const getFacultyById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.default.findOne({ _id });
    return result;
});
const updateFacultyFromDb = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
        const { faculty_id, department, office_location, courses_taught, user } = payload, remainingStudentData = __rest(payload, ["faculty_id", "department", "office_location", "courses_taught", "user"]);
        const modifiedUpdateData = Object.assign({}, remainingStudentData);
        // Update student document with modified data
        const updatedStudent = yield faculty_model_1.default.findByIdAndUpdate(_id, modifiedUpdateData, {
            new: true,
            runValidators: true,
            session,
        });
        if (!updatedStudent) {
            throw new Error("Student not found");
        }
        // User data update, if any user fields are present
        const userFields = [
            "name", "gmail", "password", "contact", "address", "role",
            "profile_picture", "registration_date", "last_login", "status"
        ];
        const userUpdateData = {};
        for (const field of userFields) {
            const value = payload[field];
            if (value !== undefined) {
                userUpdateData[field] = value;
            }
        }
        if (Object.keys(userUpdateData).length > 0) {
            const userId = updatedStudent.user;
            yield user_model_1.UserModel.findByIdAndUpdate(userId, userUpdateData, {
                new: true,
                runValidators: true,
                session,
            });
        }
        // Commit the transaction
        yield session.commitTransaction();
        session.endSession();
        return updatedStudent;
    }
    catch (error) {
        // Abort the transaction if anything fails
        yield session.abortTransaction();
        session.endSession();
        throw new Error(`Transaction failed:`);
    }
});
const deleteFacultyById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Faculty ke find kore check kora
        const faculty = yield faculty_model_1.default.findOne({ _id }).session(session);
        if (!faculty) {
            throw new Error("Faculty not found");
        }
        // Faculty er associated user er _id niye delete korbo
        const userId = (_a = faculty.user) === null || _a === void 0 ? void 0 : _a._id;
        // FacultyUserModel theke delete
        yield faculty_model_1.default.findOneAndDelete({ _id }).session(session);
        // UserModel theke user delete
        if (userId) {
            yield user_model_1.UserModel.findOneAndDelete({ _id: userId }).session(session);
        }
        // Transaction commit
        yield session.commitTransaction();
        session.endSession();
        return { message: "Faculty and associated user deleted successfully" };
    }
    catch (error) {
        // Rollback transaction if error occurs
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.facultysService = {
    getAllFacultys,
    getFacultyById,
    updateFacultyFromDb,
    deleteFacultyById,
};
