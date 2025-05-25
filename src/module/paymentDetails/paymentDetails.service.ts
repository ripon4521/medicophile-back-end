import QueryBuilder from "../../builder/querybuilder";
import PaymentDetailsModel from "./paymentDetails.model";

// const getAllPaymentDetails = async () => {
//   const result = await PaymentDetailsModel.find({ isDeleted: false });
//   return result;
// };

const getAllPaymentDetails = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(PaymentDetailsModel, query)
    .search(["method", "accountNumber"])
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await courseQuery.exec();
  return result;
};



export const pamentDetailsService = {
  getAllPaymentDetails,
};
