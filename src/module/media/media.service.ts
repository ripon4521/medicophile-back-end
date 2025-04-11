import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IMedia } from "./media.interface";
import MediaModel from "./media.model";


const createMedia = async (payload: IMedia) => {
    const create = await MediaModel.create(payload);
    if (!create) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Faled to create Media, PLease try again",
      );
    }
    return create;
  };


  const getAllMedia = async () => {
    const get = await MediaModel.find({isDeleted:false}).populate('createdBy');
    if (!get) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Faled to get Media, PLease try again",
      );
    }
    return get;
  };


  const updateMedia = async (slug:string, payload:IMedia) => {
    const get = await MediaModel.findOneAndUpdate({slug}, payload, {
        runValidators:true,
        new:true
    });
    if (!get) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Faled to update media,  PLease reload or back and try again",
      );
    }
    return get;
  };


  const deleteMedia = async (slug:string) => {
    const get = await MediaModel.findOneAndUpdate({slug}, {
        isDeleted:true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000)
    }, {
   
        new:true
    });
    if (!get) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Faled to delete Meida, PLease try again",
      );
    }
    return get;
  };

  const getSingleMedia = async (slug:string) => {
    const get = await MediaModel.findOne({slug}).populate('createdBy');
    if (!get) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Faled to get Live Class, PLease check slug again",
      );
    }
    return get;
  };


  export const mediaService = {
    createMedia,
    deleteMedia,
    updateMedia,
    getAllMedia,
    getSingleMedia
  }

