import mongoose, { Schema, Document, model } from 'mongoose';
import { IToken } from './bkash.interface';




// Mongoose schema
const TokenSchema = new Schema<IToken>(
  {
    token: {
      type: String,
      required: true,
    },
    isExpire:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

// Mongoose model
const TokenModel =  model<IToken>('Token', TokenSchema);

export default TokenModel;
