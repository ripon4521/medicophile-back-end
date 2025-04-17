"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const team_model_1 = __importDefault(require("./team.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const createTeam = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const create = yield team_model_1.default.create(payload);
    if (!create) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Faled to create, PLease try again",
      );
    }
    return create;
  });
const getAllTeamFromDb = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(team_model_1.default, query)
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
    const result = yield courseQuery.exec();
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Faled to get Team, PLease try again",
      );
    }
    return result;
  });
const getSingleTeam = (slug) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_model_1.default
      .findOne({ slug })
      .populate({
        path: "members",
        select: "name email phone profile_picture role",
      })
      .populate({
        path: "createdBy",
        select: "name email phone profile_picture role",
      });
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Faled to get team, PLease try again",
      );
    }
    return result;
  });
const deleteTeam = (slug) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_model_1.default.findOneAndUpdate(
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
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Faled to delete team, PLease check slug and  try again",
      );
    }
    return result;
  });
const updateTeam = (slug, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_model_1.default.findOneAndUpdate(
      { slug },
      payload,
      {
        new: true,
      },
    );
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Faled to upadate team, PLease check slug and try again",
      );
    }
    return result;
  });
exports.teamService = {
  createTeam,
  updateTeam,
  deleteTeam,
  getAllTeamFromDb,
  getSingleTeam,
};
