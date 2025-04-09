import fs from 'fs';
import path from 'path';
import { sendToCloudinary } from '../../utils/sendPdfToCloudnery';


export const uploadPdfService = async (file: Express.Multer.File) => {
  const filePath = path.join(file.destination, file.filename);

  const result = await sendToCloudinary(file.filename, filePath);

  // remove local file after upload
  fs.unlinkSync(filePath);

  return result;
};
