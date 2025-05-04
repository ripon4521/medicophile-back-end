import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import BookCategoryModel from "../bookCategory/bookCategory.model";
import { UserModel } from "../user/user.model";
import { IProduct } from "./product.interface";
import { ProductModel } from "./product.model";
import QueryBuilder from "../../builder/querybuilder";

const createProduct = async (paload: IProduct) => {
  const category = await BookCategoryModel.findOne({
    _id: paload.categoryId,
    isDeleted: false,
  });
  const user = await UserModel.findOne({
    _id: paload.createdBy,
    isDeleted: false,
  });

  if (!category) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Inavlid category id");
  } else if (!user || user.role === "student") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Inavlid user id. Only admin or teacher can create",
    );
  }
  const result = await ProductModel.create(paload);
  return result;
};

const getAllProductFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(ProductModel, query)
    .search(["title", "description", "tags"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path: "categoryId",
      select: "name description slug",
    })
    .populate([
      {
        path: "createdBy",
        select: "name role phone",
      },
    ]);

  const result = await courseQuery.exec();
  return result;
};

const getSingleProducts = async (slug: string) => {
  const result = await ProductModel.findOne({ slug })
    .populate({
      path: "createdBy",
      select: "name role phone",
    })
    .populate({
      path: "categoryId",
      select: "name description slug",
    });

  return result;
};

const updateProduct = async (slug: string, payload: Partial<IProduct>) => {
  const update = await ProductModel.findOneAndUpdate({ slug }, payload, {
    new: true,
    runValidators: true,
  });
  if (!update) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update Products. Slug is not valid",
    );
  }
  return update;
};

const deleteProduct = async (slug: string) => {
  const result = await ProductModel.findOneAndUpdate(
    { slug },
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

export const productService = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductFromDb,
  getSingleProducts,
};
