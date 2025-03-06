import mongoose, { startSession } from "mongoose";
import { IUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import CanteenstaffUserModel from "./canteenstaff.model";
import { ICanteenstaffUser } from "./canteenstaff.interface";


const getAllCanteenstaffs = async () => {
    const result = await CanteenstaffUserModel.find().populate('user');
    return result;

}

const getCanteenstaffById = async (_id: string) => {
    const result = await CanteenstaffUserModel.findOne({ _id });
    return result;
}


const updateCanteenstaffFromDb = async (_id: string, payload: Partial<ICanteenstaffUser>) => {
    const session = await startSession();
    session.startTransaction();

    try {
        const { staff_id, canteen_section, shift_timing, user, ...remainingStudentData } = payload;
        const modifiedUpdateData: Record<string, unknown> = { ...remainingStudentData };

        // Update student document with modified data
        const updatedStudent = await CanteenstaffUserModel.findByIdAndUpdate(
            _id,
            modifiedUpdateData,
            {
                new: true,
                runValidators: true,
                session,
            }
        );

        if (!updatedStudent) {
            throw new Error("Student not found");
        }

     
        // User data update, if any user fields are present
        const userFields = [
            "name", "gmail", "password", "contact", "address", "role",
            "profile_picture", "registration_date", "last_login", "status"
        ];

        const userUpdateData: Partial<IUser> = {};
        for (const field of userFields) {
            const value = payload[field as keyof IUser];
            if (value !== undefined) {
                userUpdateData[field as keyof IUser] = value as any;
            }
        }

        if (Object.keys(userUpdateData).length > 0) {
            const userId = updatedStudent.user;
            await UserModel.findByIdAndUpdate(userId, userUpdateData, {
                new: true,
                runValidators: true,
                session,
            });
        }

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return updatedStudent;

    } catch (error) {
        // Abort the transaction if anything fails
        await session.abortTransaction();
        session.endSession();
        throw new Error(`Transaction failed:`);
    }
};


const deleteCanteenstaffById = async (_id: string) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Faculty ke find kore check kora
        const faculty = await CanteenstaffUserModel.findOne({ _id }).session(session);
        if (!faculty) {
            throw new Error("Faculty not found");
        }
        // Faculty er associated user er _id niye delete korbo
        const userId = faculty.user?._id;

        // CanteenstaffUserModel theke delete
        await CanteenstaffUserModel.findOneAndDelete({ _id }).session(session);

        // UserModel theke user delete
        if (userId) {
            await UserModel.findOneAndDelete({ _id: userId }).session(session);
        }

        // Transaction commit
        await session.commitTransaction();
        session.endSession();

        return { message: "Faculty and associated user deleted successfully" };
    } catch (error) {
        // Rollback transaction if error occurs
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};





export const canteenstaffService = {
    getAllCanteenstaffs, 
    getCanteenstaffById,
    updateCanteenstaffFromDb,
    deleteCanteenstaffById,

}