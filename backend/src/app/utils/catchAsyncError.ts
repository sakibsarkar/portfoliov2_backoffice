import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../interface/user.interface";

interface IUserInfoRequest extends Request {
  user?: {
    _id: string;
    email: string;
    role: TUserRole;
  };
  guest?: {
    id: string;
    name: string;
    email: string;
  };
}

type THandelerFunc = (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => void;

const catchAsyncError = (fn: THandelerFunc) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req as IUserInfoRequest, res, next)).catch((err) =>
      next(err)
    );
  };
};

export default catchAsyncError;
