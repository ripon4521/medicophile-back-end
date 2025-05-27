import { IToken } from "./bkash.interface";
import TokenModel from "./token.model";



const createToken = async (payload: IToken) => {
 const result = await TokenModel.create(payload)
  return result;
};


const getToken = async () => {
  const token = await TokenModel.findOne({isExpire:false}).sort({ createdAt: -1 }); 

  if (!token) return null;

  const now = new Date(new Date().getTime() + 6 * 60 * 60 * 1000); // BD time
  const createdAt = token.createdAt as Date; // confirm it's Date

  const diffInMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);

  if (diffInMinutes > 30) {
    return null; // expired
  }

  return token; // valid
};


export const tokenService = {
  createToken,
  getToken
}