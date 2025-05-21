import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/querybuilder";
import AppError from "../../helpers/AppError";
import OrderDetailsModel from "./orderDetails.model";
import OrderModel from "../order/order.model";
import { IOrderDetails } from "./orderDetails.interface";
import { ProductModel } from "../product/product.model";

const getAllOrderDetailsFromDb = async (
  query: Record<string, unknown>,
): Promise<IOrderDetails[]> => {
  const courseQuery = new QueryBuilder(OrderDetailsModel, query)
    .search(["name", "address"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path: "productId",
    });

  const result = await courseQuery.exec();
  return result;
};

const updateOrderDetailsAndOrderStatus = async (
  orderDetailsId: string,
  payload: {
    status?: "Refunded" | "Delivered" | "Courier";
    paymentStatus?: "Paid" | "Pending" | "Refunded";
  },
) => {
  const orderDetails = await OrderDetailsModel.findOne({
    _id: orderDetailsId,
    isDeleted: false,
  });

  if (!orderDetails) {
    throw new AppError(StatusCodes.NOT_FOUND, "OrderDetails not found");
  }

  // Update orderDetails
  await OrderDetailsModel.updateOne({ _id: orderDetailsId }, payload);

  const updateOrderPayload: Partial<{
    status: "Refunded" | "Delivered" | "Courier";
    paymentStatus: "Paid" | "Pending" | "Refunded";
  }> = {};

  if (payload.status) updateOrderPayload.status = payload.status;
  if (payload.paymentStatus)
    updateOrderPayload.paymentStatus = payload.paymentStatus;

  // Update related Order
  await OrderModel.updateOne({ _id: orderDetails.orderId }, updateOrderPayload);

  return {
    success: true,
    message: "OrderDetails ও সংশ্লিষ্ট Order আপডেট হয়েছে",
  };
};

const deleteOrderDeails = async (_id: string) => {
  const result = await OrderDetailsModel.findOneAndUpdate(
    { _id },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    { new: true },
  );

  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "PLease Try Again ");
  }
  return result;
};

const getEbook = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(OrderDetailsModel, query)
    .search(["name", "address"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path: "productId",
    })
    .populate({
      path: "userId",
      select: "name role phone profile_picture",
    })

  const result = await courseQuery.exec();

  // Filter only Hard Copy books
  const hardCopyOnly = result.filter(
    (order: any) => order.productId?.bookType === "Ebook"
  );

  return hardCopyOnly;
};


const getSingleEbook = async (slug: string) => {
  const ebook = await ProductModel.findOne({ slug, isDeleted: false }) .populate("createdBy", "name email role phone") 
  .populate("categoryId", "name");
  return ebook;
};






export const orderDetailsService = {
  getAllOrderDetailsFromDb,
  updateOrderDetailsAndOrderStatus,
  deleteOrderDeails,
  getEbook,
  getSingleEbook
};
