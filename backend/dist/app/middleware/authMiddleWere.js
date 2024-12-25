"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsyncError_1 = __importDefault(require("../../utils/catchAsyncError"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_utils_1 = __importStar(require("../../utils/user.utils"));
const config_1 = require("../config");
const AppError_1 = __importDefault(require("../error/AppError"));
const user_model_1 = __importDefault(require("../models/user.model"));
const { generateAccessToken, generateRefreshToken } = user_utils_1.userUtils;
const isAuthenticateUser = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        throw new AppError_1.default(403, "Unauthorized");
    }
    if (!accessToken || (0, user_utils_1.default)(accessToken)) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new AppError_1.default(404, "Refresh token is missing");
        }
        console.log("refresh token", refreshToken);
        console.log("secret", config_1.config.REFRESH_TOKEN.SECRET);
        const decryptedJwt = jsonwebtoken_1.default.verify(refreshToken, config_1.config.REFRESH_TOKEN.SECRET);
        const result = yield user_model_1.default.findById(decryptedJwt._id);
        if (!result) {
            return (0, sendResponse_1.default)(res, {
                success: false,
                statusCode: 404,
                data: null,
                message: "Unauthorized",
            });
        }
        const newAccessToken = generateAccessToken({
            _id: result === null || result === void 0 ? void 0 : result._id.toString(),
            email: result === null || result === void 0 ? void 0 : result.email,
            role: result === null || result === void 0 ? void 0 : result.role,
        });
        const newRefreshToken = generateRefreshToken({
            _id: result === null || result === void 0 ? void 0 : result._id.toString(),
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
        const isExistUsr = yield user_model_1.default.findById(decryptedJwt._id);
        if (!isExistUsr) {
            throw new AppError_1.default(403, "Unauthorized");
        }
        const pay = {
            _id: isExistUsr.id,
            email: isExistUsr.email,
            role: isExistUsr.role,
        };
        req.user = pay;
    }
    if (accessToken && !(0, user_utils_1.default)(accessToken)) {
        const { SECRET = "" } = config_1.config.ACCESS_TOKEN;
        const payload = jsonwebtoken_1.default.verify(accessToken, SECRET);
        if (!payload) {
            return (0, sendResponse_1.default)(res, {
                success: false,
                statusCode: 404,
                data: null,
                message: "Unauthorized",
            });
        }
        const { _id } = payload;
        const isExistUsr = yield user_model_1.default.findById(_id);
        if (!isExistUsr) {
            return (0, sendResponse_1.default)(res, {
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
}));
const authorizeRoles = (...roles) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                message: `Forbidden: Access restricted to ${roles.join(" or ")} users`,
            });
        }
        else {
            next();
        }
    };
};
exports.default = {
    isAuthenticateUser,
    authorizeRoles,
};
