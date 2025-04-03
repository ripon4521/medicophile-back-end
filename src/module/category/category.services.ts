import QueryBuilder from "../../builder/querybuilder";
import Category from "./cateegory.model";
import { searchableFields } from "./category.constant";
import { ICategory } from "./category.interface";

const createCategory = async (payload: ICategory) => {
  const result = await Category.create(payload);
  return result;
};

const getallCategory = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Category.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const updateCatgory = async (_id: string, payload: ICategory) => {
  const result = await Category.findOneAndUpdate({ _id }, payload);
  return result;
};

const deleteCategory = async (_id: string) => {
  const result = await Category.findOneAndDelete({ _id });
  return result;
};

const singleCategoryget = async (_id: string) => {
  const result = await Category.findOne({ _id });
  return result;
};

export const categoryService = {
  createCategory,
  getallCategory,
  updateCatgory,
  deleteCategory,
  singleCategoryget,
};
