import fs from "fs";
import path from "path";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudnery";

export const uploadImageService = async (file: Express.Multer.File) => {
  const imagePath = path.join(file.destination, file.filename);

  const result = await sendImageToCloudinary(file.filename, imagePath);

  // Optionally delete the local file after upload
  fs.unlinkSync(imagePath);

  return result;
};
