import PaymentDetailsModel from "./paymentDetails.model"

const getAllPaymentDetails = async() => {
    const result = await PaymentDetailsModel.find({isDeleted:false});
    return result;
}


export const pamentDetailsService = {
    getAllPaymentDetails
}