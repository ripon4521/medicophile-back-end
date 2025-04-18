import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import courseModel from "../course/course.model";
import { UserModel } from "../user/user.model";
import { IPurchaseToken } from "./purchaseToken.interface";
import PurchaseTokenModel from "./purchaseToken.model";
import CouponModel from "../coupon/coupon.model";


const createPurchaseToken = async(payload:IPurchaseToken) =>{
    const student = await UserModel.findOne({_id:payload.studentId});
    const course = await courseModel.findOne({_id:payload.courseId, isDeleted:false});
    const coupon = await CouponModel.findOne({coupon:payload.coupon, isDeleted:false});
    if (!coupon) {
        throw new AppError(StatusCodes.BAD_REQUEST, "invalid coupon")
    }
    if (!student) {
        throw new AppError(StatusCodes.BAD_REQUEST, "invalid student id")
    }else if (!course) {
        throw new AppError(StatusCodes.BAD_REQUEST, "invalid course id")
    }

    const result = await PurchaseTokenModel.create(payload);
    if (!result) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create purchase token")
    }
    return result;
}


export const purchaseTokenService = {
    createPurchaseToken,
}