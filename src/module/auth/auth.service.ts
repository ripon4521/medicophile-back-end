import { CustomError } from '../../helpers/handleCustomError'
import { IUser } from '../user/user.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../user/user.model'

const register = async (payload: IUser) => {
  const result = await UserModel.create(payload)
  if (!result) {
    throw new CustomError('Failed to create user', 500);
  }
  return result
}


const login = async (payload:{ gmail: string, password: string }) => {
  // Validate input
    if (!payload.gmail || !payload.password) {
      throw { message: 'Mobile and PIN are required', statusCode: 400 };
    }
  // Find user by mobile number and select the pin field
  const user = await UserModel.findOne({gmail: payload?.gmail}).select('+password');
  if (!user) {
    throw { message: 'User not found!', statusCode: 404, field: 'mobile' };
  }
  if (user.status !== 'unblocked') {
    throw { message: 'This user is blocked!', statusCode: 403 };
  }
  // Check if the pin matches
  const isPinMatched = await bcrypt.compare(payload.password, user.password);
  if (!isPinMatched) {
    throw { message: 'Invalid PIN', statusCode: 401, field: 'pin' };
  }
  console.log('isPinMatched',isPinMatched)
  // JWT Payload
  const jwtPayload = { gmail:user.gmail, role: user.role, _id: user._id.toString() };
  // // Generate JWT token
  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET || "primarytestkey", { expiresIn: '30d' });
  return { token, user };
};


export const AuthService = {
  register,
  login,
}
