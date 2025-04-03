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
exports.classscheduleService = void 0;
const classschedule_model_1 = __importDefault(require("./classschedule.model"));
const createClassscheduleIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSchedule = new classschedule_model_1.default(payload);
        yield newSchedule.save();
        return newSchedule;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to create class schedule: ${error.message}`);
        }
        throw new Error("An unknown error occurred while creating the class schedule.");
    }
});
const getsingleClassscheduleById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield classschedule_model_1.default.findOne({ _id })
        .populate("courseId")
        .populate("facultyId");
    return result;
});
const updateClassscheduleInDb = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.day && Array.isArray(payload.day)) {
        for (const dayUpdate of payload.day) {
            const updateData = {};
            if (dayUpdate.day)
                updateData.day = dayUpdate.day;
            if (dayUpdate.time)
                updateData.time = dayUpdate.time;
            console.log("Updating subdocument:", dayUpdate._id, "with data:", updateData);
            const result = yield classschedule_model_1.default.updateOne({ _id, "day._id": dayUpdate._id }, {
                $set: { "day.$.day": updateData.day, "day.$.time": updateData.time },
            });
            console.log("Update result:", result);
            if (!result.modifiedCount) {
                console.log("No matching subdocument found or no changes were made.");
            }
            else {
                console.log("Subdocument updated successfully.");
            }
        }
    }
    const updatedParentDoc = yield classschedule_model_1.default.findById(_id);
    return updatedParentDoc;
});
const deleteClassscheduleFromDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield classschedule_model_1.default.findOneAndDelete({ _id });
    return result;
});
const getAllClassscheduleIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield classschedule_model_1.default.find()
            .populate("courseId")
            .populate("facultyId");
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to create class schedule: ${error.message}`);
        }
        throw new Error("An unknown error occurred while creating the class schedule.");
    }
});
exports.classscheduleService = {
    createClassscheduleIntoDB,
    getAllClassscheduleIntoDB,
    getsingleClassscheduleById,
    updateClassscheduleInDb,
    deleteClassscheduleFromDb,
};
