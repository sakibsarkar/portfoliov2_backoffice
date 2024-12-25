import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { config } from "../app/config";
import { IUser } from "../app/interface/user.interface";
import User from "../app/models/user.model";

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const generateAccessToken = (
  payload: Pick<IUser, "_id" | "email" | "role">
) => {
  const accessToken = jwt.sign(payload, config.ACCESS_TOKEN.SECRET as string, {
    expiresIn: config.ACCESS_TOKEN.EXPIRES_IN,
  });
  return accessToken;
};
const generateRefreshToken = (payload: Pick<IUser, "_id">) => {
  const refreshToken = jwt.sign(
    payload,
    config.REFRESH_TOKEN.SECRET as string,
    {
      // expiresIn: "30d",
      expiresIn: config.REFRESH_TOKEN.EXPIRES_IN,
    }
  );
  return refreshToken;
};

const isTokenExpired = (token: string) => {
  if (!token) {
    return true;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decodedToken: any = jwt.decode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

const adminSeed = async () => {
  const admin = await User.findOne({ role: "admin" });
  if (admin) {
    return;
  }
  const data = {
    firstName: "Admin",
    lastName: "Admin",
    email: "4cM9I@example.com",
    role: "admin",
  };
  const password = await hashPassword(config.ADMIN_PASSWORD!);
  const result = await User.create({ ...data, password });
  return result;
};

export default isTokenExpired;

export const userUtils = {
  adminSeed,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  isTokenExpired,
};
