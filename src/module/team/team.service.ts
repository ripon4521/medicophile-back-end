import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { ITeams } from "./team.interface";
import Team from "./team.model";
import QueryBuilder from "../../builder/querybuilder";
import { IBlog } from "../blog/blog.interface";
import { UserModel } from "../user/user.model";

const createTeam = async (payload: ITeams) => {
  const user = await UserModel.findOne({_id:payload.createdBy});
    if (!user) {
      throw new AppError(StatusCodes.BAD_REQUEST, "invalid user id. Please provide valid user id")
    }

    const member = await UserModel.findOne({_id:payload.members});
    if (!member) {
      throw new AppError(StatusCodes.BAD_REQUEST, "invalid member id. Please provide valid member id")
    }
    
  const create = await Team.create(payload);
  if (!create) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Faled to create, PLease try again",
    );
  }
  return create;
};

const getAllTeamFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Team, query)
    .search(["name", "description"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path: "members",
      select: "name email phone profile_picture role",
    })
    .populate({
      path: "createdBy",
      select: "name email phone profile_picture role",
    });

  const result = await courseQuery.exec();
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Faled to get Team, PLease try again",
    );
  }
  return result;
};

const getSingleTeam = async (slug: string) => {
  const result = await Team.findOne({ slug })
    .populate({
      path: "members",
      select: "name email phone profile_picture role",
    })
    .populate({
      path: "createdBy",
      select: "name email phone profile_picture role",
    });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Faled to get team, PLease try again",
    );
  }
  return result;
};

const deleteTeam = async (slug: string) => {
  const result = await Team.findOneAndUpdate(
    { slug },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    {
      new: true,
    },
  );
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Faled to delete team, PLease check slug and  try again",
    );
  }
  return result;
};

const updateTeam = async (slug: string, payload: IBlog) => {
  const result = await Team.findOneAndUpdate({ slug }, payload, {
    new: true,
  });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Faled to upadate team, PLease check slug and try again",
    );
  }
  return result;
};

export const teamService = {
  createTeam,
  updateTeam,
  deleteTeam,
  getAllTeamFromDb,
  getSingleTeam,
};
