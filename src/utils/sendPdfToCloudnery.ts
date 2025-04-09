import { StatusCodes } from "http-status-codes";
import AppError from "../helpers/AppError";
import { ICloudinaryResponse } from "./sendImageToCloudnery";
import { v2 as cloudinary } from 'cloudinary';
import path from 'path'; // ⬅️ Add this

export const sendToCloudinary = async (
  fileName: string,
  filePath: string
): Promise<ICloudinaryResponse> => {
  return new Promise((resolve, reject) => {
    const fileNameWithoutExt = fileName.replace(path.extname(fileName), ''); // ✅ Remove extension

    cloudinary.uploader.upload(
      filePath,
      {
        public_id: fileNameWithoutExt, // ✅ Prevents double extension
        resource_type: 'auto',
      },
      (err, result) => {
        if (err) {
          reject(
            new AppError(
              StatusCodes.CONFLICT,
              'File cannot upload',
              err?.name
            )
          );
        }

        resolve(result as ICloudinaryResponse);
      }
    );
  });
};
