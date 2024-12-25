import bcrypt from "bcrypt";
// import jwt from 'jsonwebtoken'
import { Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import catchAsyncError from "../../utils/catchAsyncError";
import sendMessage from "../../utils/sendMessage";
import sendResponse from "../../utils/sendResponse";

import { userUtils } from "../../utils/user.utils";
import { config } from "../config";
import AppError from "../error/AppError";
import { IUser } from "../interface/user.interface";
import User from "../models/user.model";
const { generateAccessToken, generateRefreshToken, hashPassword } = userUtils;
const register = catchAsyncError(async (req, res) => {
  const body = req.body as IUser;
  const { firstName, lastName, email, password, role } = body;
  if (role && role == "admin") {
    throw new AppError(400, "Admin role is not allowed");
  }

  const user = await User.findOne({
    email: email,
  });

  if (user) {
    throw new AppError(400, "User already exist");
  }

  const hashedPassword = await hashPassword(password);

  const data = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: role || "player",
  };

  const result = await User.create(data);

  const accessToken = generateAccessToken({
    _id: result.id,
    email: result.email,
    role: role || "player",
  });
  const refreshToken = generateRefreshToken({ _id: result.id.toString() });
  res
    .cookie("accessToken", accessToken, {
      sameSite: "none",
      maxAge: 1000 * 24 * 60 * 60 * 30,
      httpOnly: true,
      secure: true,
    })
    .cookie("refreshToken", refreshToken, {
      sameSite: "none",
      maxAge: 1000 * 24 * 60 * 60 * 30,
      httpOnly: true,
      secure: true,
    });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "User created successfully",
  });
});
const createUser = catchAsyncError(async (req, res) => {
  const body = req.body as IUser;
  const { firstName, email, password, role } = body;
  if (role && role == "admin") {
    throw new AppError(400, "Admin role is not allowed");
  }

  const user = await User.findOne({
    email: email,
  });

  if (user) {
    throw new AppError(400, "User already exist");
  }

  const hashedPassword = await hashPassword(password);

  const data = {
    firstName,
    email,
    password: hashedPassword,
    role: role || "user",
  };

  const result = await User.create(data);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "User created successfully",
  });
});

const login = catchAsyncError(async (req, res) => {
  const body = req.body as Pick<IUser, "email" | "password">;

  const user = await User.findOne({
    email: body.email,
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isMatch = bcrypt.compareSync(body.password, user.password!);
  if (!isMatch) {
    throw new AppError(403, "Unauthorized. Password is incorrect");
  }

  const accessToken = generateAccessToken({
    _id: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({ _id: user._id.toString() });

  res
    .cookie("accessToken", accessToken, {
      sameSite: "none",
      maxAge: 1000 * 24 * 60 * 60 * 30,
      httpOnly: true,
      secure: true,
    })
    .cookie("refreshToken", refreshToken, {
      // sameSite: 'strict',
      sameSite: "none",
      maxAge: 1000 * 24 * 60 * 60 * 30,
      httpOnly: true,
      secure: true,
    });

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...rest } = user.toObject();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: {
      accessToken,
      user: rest,
    },
    message: "User logged in successfully",
  });
});

const updateProfileAvatar = catchAsyncError(async (req, res) => {
  const user = req.user!;
  const file = req.file;
  if (!file) {
    throw new AppError(404, "File not found");
  }
  const userInfo = await User.findById(user._id);

  if (!userInfo) {
    throw new AppError(404, "User not found");
  }

  const fileName = `${user._id}-${Date.now()}-${file.originalname}`;

  // 📝 todo: save image in cloud
  fs.unlinkSync(file.path);
  const result = await User.findByIdAndUpdate(userInfo._id, {
    image: fileName,
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "User updated successfully",
  });
});

const author = catchAsyncError(async (req, res) => {
  const user = req.user!;

  const result = await User.findById(user._id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: {
      ...result?.toObject(),
      password: undefined,
    },
    message: "User fetched successfully",
  });
});

const updateProfile = catchAsyncError(async (req, res) => {
  const user = req.user;

  if (!user) throw new AppError(404, "User not found");

  const { _id } = user;
  const existingUser = await User.findById(_id);
  if (!existingUser) throw new AppError(404, "User not found");
  [
    "email",
    "password",
    "role",
    "passwordResetToken",
    "passwordResetExpiry",
  ].forEach((key) => {
    if (req.body[key]) {
      delete req.body[key];
    }
  });
  const result = await User.findByIdAndUpdate(_id, ...req.body, {
    new: true,
    runValidators: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Profile updated. Confirm email if requested.",
  });
});

const logout = catchAsyncError(async (req, res) => {
  res.clearCookie("accessToken", {
    path: "/",
    sameSite: "none",
    secure: true,
  });
  res.clearCookie("refreshToken", {
    path: "/",
    sameSite: "none",
    secure: true,
  });

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    data: null,
    message: "User logged out successfully",
  });
});

const refreshToken = async (req: Request, res: Response) => {
  try {
    const { cookies } = req;
    // const user = req.user

    const { refreshToken } = cookies as {
      refreshToken: string | undefined;
      accessToken: string | undefined;
    };

    if (!refreshToken) {
      throw new AppError(400, "No refresh token provided");
    }

    const decryptedJwt = jwt.verify(
      refreshToken,
      config.REFRESH_TOKEN.SECRET as string
    ) as { id: string };

    if (!decryptedJwt) {
      throw new AppError(400, "Invalid refresh token");
    }

    const user = await User.findById(decryptedJwt.id);
    if (!user) {
      throw new AppError(404, "User not found");
    }
    const accessToken = generateAccessToken({
      _id: user.id,
      email: user.email,
      role: user.role,
    });

    // Generate new Access Token
    res.cookie("accessToken", accessToken, {
      path: "/api/v1",
      sameSite: "none",
      maxAge: 1000 * 3600,
      httpOnly: true,
      // secure: !(config.ENV === EApplicationEnvironment.DEVELOPMENT)
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Token refreshed",
      data: { accessToken },
    });
  } catch (error) {
    res.clearCookie("accessToken", {
      path: "/",
      sameSite: "none",
      secure: true,
    });
    res.clearCookie("refreshToken", {
      path: "/",
      sameSite: "none",
      secure: true,
    });

    sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "Invalid refresh token",
      data: null,
    });
  }
};

const forgotPassword = catchAsyncError(async (req, res) => {
  const { body } = req;
  const email = body.email;

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const token = v4();
  const expiry = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes from now

  await User.findByIdAndUpdate(user.id, {
    passwordResetToken: token,
    passwordResetExpiry: expiry,
  });

  const url = `${config.BASE_SITE}/reset-password/${token}`;
  const subject = "Account Password Reset Requested";
  const emailContent = `
        <p style="text-align: center;">
            Hey ${user.firstName} ${user.lastName}, please reset your account password by clicking on the link below.<br>
            This link will expire within 5 minutes.
        </p>
        <a href="${url}" style="text-align: center; display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
    `;

  try {
    await sendMessage({
      html: emailContent,
      receiverMail: user.email,
      subject,
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Password reset email sent",
      data: null,
    });
  } catch {
    throw new AppError(500, "Error sending password reset email");
  }
});

const resetPassword = catchAsyncError(async (req, res) => {
  const { password: newPassword, token } = req.body;
  const user = await User.findOne({
    where: {
      passwordResetToken: token,
    },
  });

  if (!user || !user.passwordResetToken || !user.passwordResetExpiry) {
    throw new AppError(404, "User not found or invalid reset token");
  }

  const storedExpiry = new Date(user.passwordResetExpiry).getTime();
  const currentTimestamp = new Date().getTime();

  if (currentTimestamp > storedExpiry) {
    throw new AppError(400, "Link expired");
  }

  const hashedPassword = await hashPassword(newPassword);

  await User.findByIdAndUpdate(user.id, {
    password: hashedPassword,
    passwordResetToken: null,
    passwordResetExpiry: null,
  });

  const to = user.email;
  const subject = "Account Password Reset";

  await sendMessage({
    html: `
            <p style="text-align: center;">Hey ${user.firstName} ${user?.lastName}, your account password has been reset successfully.</p>`,
    receiverMail: to,
    subject,
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Password reset successfully",
    data: null,
  });
});

const changePassword = catchAsyncError(async (req, res) => {
  const body = req.body;
  const userAuth = req.user;
  if (!userAuth) {
    throw new AppError(404, "User not found");
  }
  const { password: newPassword, oldPassword } = body;

  const user = await User.findById(userAuth._id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isPasswordMatching = bcrypt.compareSync(oldPassword, user.password!);
  if (!isPasswordMatching) {
    throw new AppError(403, "Unauthorized. Password is incorrect");
  }

  if (newPassword === oldPassword) {
    throw new AppError(
      400,
      "New password cannot be the same as the old password"
    );
  }

  const hashedPassword = await hashPassword(newPassword);

  await User.findByIdAndUpdate(userAuth._id, {
    password: hashedPassword,
  });

  const to = user.email;
  const subject = "Password Changed";
  const emailContent = `
        <p style="text-align: center;">Hey ${user.firstName} ${user.lastName}, your account password has been changed successfully.</p>`;

  await sendMessage({
    html: emailContent,
    receiverMail: to,
    subject,
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Password changed successfully",
    data: null,
  });
});

export default {
  register,
  createUser,
  login,
  updateProfile,
  author,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfileAvatar,
};
