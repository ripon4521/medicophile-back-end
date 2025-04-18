import fs from "fs";
import path from "path";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudnery";

export const uploadImageService = async (file: Express.Multer.File) => {
  const imagePath = path.join(file.destination, file.filename);

  // ✅ Extension ছাড়া ফাইলনেম
  const imageName = path.parse(file.filename).name;

  const result = await sendImageToCloudinary(imageName, imagePath);

  // ✅ লোকাল ফাইল ডিলিট
  fs.unlinkSync(imagePath);

  return result;
};
