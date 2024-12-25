// import catchAsyncError from '../util/catchAsyncError'
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import catchAsyncError from "../../utils/catchAsyncError";
import sendResponse from "../../utils/sendResponse";
import isTokenExpired, { userUtils } from "../../utils/user.utils";
import { config } from "../config";
import AppError from "../error/AppError";
import { TUserRole } from "../interface/user.interface";
import User from "../models/user.model";

const { generateAccessToken, generateRefreshToken } = userUtils;

const isAuthenticateUser = catchAsyncError(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new AppError(403, "Unauthorized");
  }

  if (!accessToken || isTokenExpired(accessToken)) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError(404, "Refresh token is missing");
    }

    const decryptedJwt = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as { _id: string };

    const result = await User.findById(decryptedJwt._id);

    if (!result) {
      return sendResponse(res, {
        success: false,
        statusCode: 404,
        data: null,
        message: "Unauthorized",
      });
    }

    const newAccessToken = generateAccessToken({
      _id: result?._id.toString(),
      email: result?.email,
      role: result?.role,
    });

    const newRefreshToken = generateRefreshToken({
      _id: result?._id.toString(),
    });

    res
      .cookie("accessToken", newAccessToken, {
        sameSite: "none",
        maxAge: 1000 * 24 * 60 * 60 * 30,
        httpOnly: true,
        secure: true,
      })
      .cookie("refreshToken", newRefreshToken, {
        sameSite: "none",
        maxAge: 1000 * 24 * 60 * 60 * 30,
        httpOnly: true,
        secure: true,
      });

    const isExistUsr = await User.findById(decryptedJwt._id);
    if (!isExistUsr) {
      throw new AppError(403, "Unauthorized");
    }

    const pay = {
      _id: isExistUsr.id,
      email: isExistUsr.email,
      role: isExistUsr.role,
    };

    req.user = pay;
  }

  if (accessToken && !isTokenExpired(accessToken)) {
    const { SECRET = "" } = config.ACCESS_TOKEN;
    const payload = jwt.verify(accessToken, SECRET);
    if (!payload) {
      return sendResponse(res, {
        success: false,
        statusCode: 404,
        data: null,
        message: "Unauthorized",
      });
    }
    const { _id } = payload as { _id: string; email: string; role: string };
    const isExistUsr = await User.findById(_id);
    if (!isExistUsr) {
      return sendResponse(res, {
        success: false,
        statusCode: 404,
        data: null,
        message: "Unauthorized",
      });
    }

    const pay = {
      _id: isExistUsr._id.toString(),
      email: isExistUsr.email,
      role: isExistUsr.role,
    };

    req.user = pay;
  }

  next();
});
const authorizeRoles = (...roles: TUserRole[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message: `Forbidden: Access restricted to ${roles.join(" or ")} users`,
      });
    } else {
      next();
    }
  };
};
export default {
  isAuthenticateUser,
  authorizeRoles,
};
