import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { config } from "../app/config";
import { IUser } from "../app/interface/user.interface";

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
  const refreshToken = jwt.sign(payload, config.ACCESS_TOKEN.SECRET as string, {
    // expiresIn: "30d",
    expiresIn: config.ACCESS_TOKEN.EXPIRES_IN,
  });
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

export default isTokenExpired;

export {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  isTokenExpired,
};
