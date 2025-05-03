import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { ILiveClass } from "./liveClass.inerface";
import LiveClassModel from "./liveClass.model";
import QueryBuilder from "../../builder/querybuilder";

const createLiveClass = async (payload: ILiveClass) => {
  const create = await LiveClassModel.create(payload);
  if (!create) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Faled to create Live Class, PLease try again",
    );
  }
  return create;
};

// const getAllLiveClass = async () => {
//   const get = await LiveClassModel.find({ isDeleted: false })
//     .populate("courseId")
//     .populate("createdBy");
//   if (!get) {
//     throw new AppError(
//       StatusCodes.BAD_REQUEST,
//       "Faled to get Live Class, PLease try again",
//     );
//   }
//   return get;
// };
const getAllLiveClass = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(LiveClassModel, query)
    .search(["title"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path: "courseId",
    })
    .populate([
      {
        path: "createdBy",
        select: "name role phone",
      },
    ]);
  const result = await courseQuery.exec();
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed  to get Live Class");
  }
  return result;
};


const updateLiveClass = async (slug: string, payload: ILiveClass) => {
  const get = await LiveClassModel.findOneAndUpdate({ slug }, payload, {
    runValidators: true,
    new: true,
  });
  if (!get) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Faled to update Live Class,  PLease reload or back and try again",
    );
  }
  return get;
};

const deleteLiveClass = async (slug: string) => {
  const get = await LiveClassModel.findOneAndUpdate(
    { slug },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    {
      new: true,
    },
  );
  if (!get) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Faled to delete Live Class, PLease try again",
    );
  }
  return get;
};

const singleGetLiveClass = async (slug: string) => {
  const get = await LiveClassModel.findOne({ slug })
    .populate("courseId")
    .populate("createdBy");
  if (!get) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Faled to get Live Class, PLease check slug again",
    );
  }
  return get;
};

export const liveClassService = {
  createLiveClass,
  updateLiveClass,
  deleteLiveClass,
  getAllLiveClass,
  singleGetLiveClass,
};
