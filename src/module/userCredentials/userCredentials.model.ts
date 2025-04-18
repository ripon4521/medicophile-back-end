// models/userCredentials.model.ts

import { Schema, model, Types } from "mongoose";

const userCredentialsSchema = new Schema(
  {
    studentId: {
      type: Types.ObjectId,
      ref: "Students",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
   
    },
    refreshToken: {
      type: String,
      
    },
    ipAddress: {
      type: String,
      required: true,
    },
    deviceType: {
      type: String,
      required: true,
    },
    deviceName: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

export const UserCredentialsModel = model(
  "UserCredentials",
  userCredentialsSchema,
);
