import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IModules } from "./modules.interface";
import ModuleModel from "./modules.model";
import QueryBuilder from "../../builder/querybuilder";
import courseModel from "../course/course.model";

const createModule = async (payload: IModules) => {
  const result = await ModuleModel.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to create module, please try again and check your from data ",
    );
  }
  return result;
};

const getAllModule = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(ModuleModel, query)
    .search(["moduleTitle"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path: "courseId",
      select:
        "cover_photo course_title description duration course_type category daySchedule expireTime price offerPrice status slug",
      populate: { path: "category", select: "title cover_photo" },
    })
    .populate([
      {
        path: "createdBy",
        select: "name role phone",
      },
    ]);

  const result = await courseQuery.exec();
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to load data , Please try again",
    );
  }
  return result;

  // .populate([
  //   {
  //     path: "createdBy",
  //     select: "name role phone",
  //   },
  // ]);
  //   .populate("createdBy")
  //   .populate({
  //     path: "courseId",
  //     populate: { path: "category" },
  //   });
  // if (!result) {
  //   throw new AppError(
  //     StatusCodes.BAD_REQUEST,
  //     "Failed to load data , Please try again",
  //   );
  // }
  // return result;
};

const getSingleModule = async (slug: string) => {
  const result = await ModuleModel.findOne({ slug })
    .populate("createdBy")
    .populate({
      path: "courseId",
      populate: { path: "category" },
    });
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed to load data");
  }
  return result;
};

const getSpecificModule = async(id:string) => {
  // console.log(id)
  const course = await courseModel.findOne({_id:id});
  // console.log(course)
  if (!course) {
    throw new AppError(StatusCodes.BAD_REQUEST, "invalid course id");
  }
  const result = await ModuleModel.find({ courseId:id })
  .populate("createdBy")
  .populate({
    path: "courseId",
    populate: { path: "category" },
  });
 
if (!result) {
  throw new AppError(StatusCodes.BAD_REQUEST, "Failed to load data");
}
return result;
}




const updateModule = async (slug: string, payload: Partial<IModules>) => {
  const update = await ModuleModel.findOneAndUpdate({ slug }, payload, {
    new: true,
    runValidators: true,
  });
  if (!update) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update data , please check data and try again",
    );
  }
  return update;
};

const deleteModule = async (slug: string) => {
  const result = await ModuleModel.findOneAndUpdate(
    { slug },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
    },
    { new: true },
  );
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      " Failed to delete data, please reload and try again ",
    );
  }
  return result;
};

export const moduleService = {
  createModule,
  deleteModule,
  updateModule,
  getAllModule,
  getSingleModule,
  getSpecificModule
};
