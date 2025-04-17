import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { teamService } from "./team.service";
import AppError from "../../helpers/AppError";

const createTeam = catchAsync(async (req, res) => {
  const result = await teamService.createTeam(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Team Created successfully",
    data: result,
  });
});

const getAllTeam = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await teamService.getAllTeamFromDb(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Team get successfully",
    data: result,
  });
});

const getSingleTeam = catchAsync(async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide a valid slug");
  }
  const result = await teamService.getSingleTeam(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Single Team get successfully",
    data: result,
  });
});

const deleteTeam = catchAsync(async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide a valid slug");
  }
  const result = await teamService.deleteTeam(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Team deleted successfully",
    data: result,
  });
});

const updateTeam = catchAsync(async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide a valid slug");
  }
  const payload = req.body;
  const result = await teamService.updateTeam(slug, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Team updated successfully",
    data: result,
  });
});

export const teamController = {
  createTeam,
  updateTeam,
  deleteTeam,
  getAllTeam,
  getSingleTeam,
};
