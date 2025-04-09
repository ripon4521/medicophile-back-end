import { v2 as cloudinary } from 'cloudinary';
import multer, { Multer } from 'multer';
import httpStatus from 'http-status';

import path from 'path';
import AppError from '../helpers/AppError';
import config from '../config';

export interface ICloudinaryResponse {
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
}

// Cloudinary configuration
cloudinary.config({
  cloud_name: config.cloudinaryCloudName || 'dpy7b0pzi',
  api_key: config.cloudinaryApiKey || '744272462512389',
  api_secret: config.cloudinaryApiSecret || 'qt4JkEurFxNa42MIwSJOnaImCxo',
  secure: true,
});

/**
 * Uploads image to Cloudinary
 * @param imageName Custom image name for Cloudinary
 * @param filePath Local path of the file to upload
 * @returns Cloudinary upload response
 */
export const sendImageToCloudinary = async (
  imageName: string,
  filePath: string
): Promise<ICloudinaryResponse> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: imageName,
      transformation: {
        aspect_ratio: 1,
        width: 400,
        quality: 60,
        fetch_format: 'auto',
      },
    });

    return result as ICloudinaryResponse;
  } catch (error: any) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Image upload failed to Cloudinary',
      error?.message
    );
  }
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// Multer instance
export const upload: Multer = multer({ storage });
