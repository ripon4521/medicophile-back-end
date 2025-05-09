import { StatusCodes } from "http-status-codes";
import AppError from "../helpers/AppError";
import { ICloudinaryResponse } from "./sendImageToCloudnery";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

export const sendToCloudinary = async (
  fileName: string,
  filePath: string,
): Promise<ICloudinaryResponse> => {
  return new Promise((resolve, reject) => {
    const fileNameWithoutExt = fileName.replace(path.extname(fileName), "");

    cloudinary.uploader.upload(
      filePath,
      {
        public_id: fileNameWithoutExt,
        resource_type: "raw", // ⬅️ important for PDF and other non-image files
      },
      (err, result) => {
        if (err || !result) {
          return reject(
            new AppError(
              StatusCodes.CONFLICT,
              "File cannot be uploaded to Cloudinary",
              err?.name || "CloudinaryUploadError"
            )
          );
        }

        resolve(result as ICloudinaryResponse);
      }
    );
  });
};
