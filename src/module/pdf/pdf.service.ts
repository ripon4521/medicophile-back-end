import fs from "fs";
import path from "path";
import { sendToCloudinary } from "../../utils/sendPdfToCloudnery";

export const uploadPdfService = async (file: Express.Multer.File) => {
  const filePath = path.join(file.destination, file.filename);

  // ✅ Extension ছাড়া নাম
  const pdfName = path.parse(file.filename).name;

  const result = await sendToCloudinary(pdfName, filePath);

  // ✅ লোকাল ফাইল রিমুভ
  fs.unlinkSync(filePath);

  return result;
};
