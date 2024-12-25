"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const catchAsyncError_1 = __importDefault(require("../../utils/catchAsyncError"));
const sendMessage_1 = __importDefault(require("../../utils/sendMessage"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_utils_1 = require("../../utils/user.utils");
const config_1 = require("../config");
const AppError_1 = __importDefault(require("../error/AppError"));
const user_model_1 = __importDefault(require("../models/user.model"));
const register = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { firstName, lastName, email, password, role } = body;
    if (role && role == "admin") {
        throw new AppError_1.default(400, "Admin role is not allowed");
    }
    const user = yield user_model_1.default.findOne({
        email: email,
    });
    if (user) {
        throw new AppError_1.default(400, "User already exist");
    }
    const hashedPassword = yield (0, user_utils_1.hashPassword)(password);
    const data = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role || "player",
    };
    const result = yield user_model_1.default.create(data);
    const accessToken = (0, user_utils_1.generateAccessToken)({
        _id: result.id,
        email: result.email,
        role: role || "player",
    });
    const refreshToken = (0, user_utils_1.generateRefreshToken)({ _id: result.id.toString() });
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
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "User created successfully",
    });
}));
const createUser = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { firstName, email, password, role } = body;
    if (role && role == "admin") {
        throw new AppError_1.default(400, "Admin role is not allowed");
    }
    const user = yield user_model_1.default.findOne({
        email: email,
    });
    if (user) {
        throw new AppError_1.default(400, "User already exist");
    }
    const hashedPassword = yield (0, user_utils_1.hashPassword)(password);
    const data = {
        firstName,
        email,
        password: hashedPassword,
        role: role || "user",
    };
    const result = yield user_model_1.default.create(data);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "User created successfully",
    });
}));
const login = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = yield user_model_1.default.findOne({
        email: body.email,
    });
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    const isMatch = bcrypt_1.default.compareSync(body.password, user.password);
    if (!isMatch) {
        throw new AppError_1.default(403, "Unauthorized. Password is incorrect");
    }
    const accessToken = (0, user_utils_1.generateAccessToken)({
        _id: user.id,
        email: user.email,
        role: user.role,
    });
    // const refreshToken = generateRefreshToken(user.id.toString());
    // console.log("refresh token", refreshToken);
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
    const _a = user.toObject(), { password } = _a, rest = __rest(_a, ["password"]);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: rest,
        message: "User logged in successfully",
    });
}));
const updateProfileAvatar = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const file = req.file;
    if (!file) {
        throw new AppError_1.default(404, "File not found");
    }
    const userInfo = yield user_model_1.default.findById(user._id);
    if (!userInfo) {
        throw new AppError_1.default(404, "User not found");
    }
    const fileName = `${user._id}-${Date.now()}-${file.originalname}`;
    // 📝 todo: save image in cloud
    fs_1.default.unlinkSync(file.path);
    const result = yield user_model_1.default.findByIdAndUpdate(userInfo._id, {
        image: fileName,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "User updated successfully",
    });
}));
const author = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield user_model_1.default.findById(user._id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: Object.assign(Object.assign({}, result === null || result === void 0 ? void 0 : result.toObject()), { password: undefined }),
        message: "User fetched successfully",
    });
}));
const updateProfile = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user)
        throw new AppError_1.default(404, "User not found");
    const { _id } = user;
    const existingUser = yield user_model_1.default.findById(_id);
    if (!existingUser)
        throw new AppError_1.default(404, "User not found");
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
    const result = yield user_model_1.default.findByIdAndUpdate(_id, ...req.body, {
        new: true,
        runValidators: true,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "Profile updated. Confirm email if requested.",
    });
}));
const logout = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: null,
        message: "User logged out successfully",
    });
}));
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookies } = req;
        // const user = req.user
        const { refreshToken } = cookies;
        if (!refreshToken) {
            throw new AppError_1.default(400, "No refresh token provided");
        }
        const decryptedJwt = jsonwebtoken_1.default.verify(refreshToken, config_1.config.REFRESH_TOKEN.SECRET);
        if (!decryptedJwt) {
            throw new AppError_1.default(400, "Invalid refresh token");
        }
        const user = yield user_model_1.default.findById(decryptedJwt.id);
        if (!user) {
            throw new AppError_1.default(404, "User not found");
        }
        const accessToken = (0, user_utils_1.generateAccessToken)({
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
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: "Token refreshed",
            data: { accessToken },
        });
    }
    catch (error) {
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
        (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 400,
            message: "Invalid refresh token",
            data: null,
        });
    }
});
const forgotPassword = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const email = body.email;
    const user = yield user_model_1.default.findOne({
        email: email,
    });
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    const token = (0, uuid_1.v4)();
    const expiry = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes from now
    yield user_model_1.default.findByIdAndUpdate(user.id, {
        passwordResetToken: token,
        passwordResetExpiry: expiry,
    });
    const url = `${config_1.config.BASE_SITE}/reset-password/${token}`;
    const subject = "Account Password Reset Requested";
    const emailContent = `
        <p style="text-align: center;">
            Hey ${user.firstName} ${user.lastName}, please reset your account password by clicking on the link below.<br>
            This link will expire within 5 minutes.
        </p>
        <a href="${url}" style="text-align: center; display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
    `;
    try {
        yield (0, sendMessage_1.default)({
            html: emailContent,
            receiverMail: user.email,
            subject,
        });
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: "Password reset email sent",
            data: null,
        });
    }
    catch (_a) {
        throw new AppError_1.default(500, "Error sending password reset email");
    }
}));
const resetPassword = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password: newPassword, token } = req.body;
    const user = yield user_model_1.default.findOne({
        where: {
            passwordResetToken: token,
        },
    });
    if (!user || !user.passwordResetToken || !user.passwordResetExpiry) {
        throw new AppError_1.default(404, "User not found or invalid reset token");
    }
    const storedExpiry = new Date(user.passwordResetExpiry).getTime();
    const currentTimestamp = new Date().getTime();
    if (currentTimestamp > storedExpiry) {
        throw new AppError_1.default(400, "Link expired");
    }
    const hashedPassword = yield (0, user_utils_1.hashPassword)(newPassword);
    yield user_model_1.default.findByIdAndUpdate(user.id, {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpiry: null,
    });
    const to = user.email;
    const subject = "Account Password Reset";
    yield (0, sendMessage_1.default)({
        html: `
            <p style="text-align: center;">Hey ${user.firstName} ${user === null || user === void 0 ? void 0 : user.lastName}, your account password has been reset successfully.</p>`,
        receiverMail: to,
        subject,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Password reset successfully",
        data: null,
    });
}));
const changePassword = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const userAuth = req.user;
    if (!userAuth) {
        throw new AppError_1.default(404, "User not found");
    }
    const { password: newPassword, oldPassword } = body;
    const user = yield user_model_1.default.findById(userAuth._id);
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    const isPasswordMatching = bcrypt_1.default.compareSync(oldPassword, user.password);
    if (!isPasswordMatching) {
        throw new AppError_1.default(403, "Unauthorized. Password is incorrect");
    }
    if (newPassword === oldPassword) {
        throw new AppError_1.default(400, "New password cannot be the same as the old password");
    }
    const hashedPassword = yield (0, user_utils_1.hashPassword)(newPassword);
    yield user_model_1.default.findByIdAndUpdate(userAuth._id, {
        password: hashedPassword,
    });
    const to = user.email;
    const subject = "Password Changed";
    const emailContent = `
        <p style="text-align: center;">Hey ${user.firstName} ${user.lastName}, your account password has been changed successfully.</p>`;
    yield (0, sendMessage_1.default)({
        html: emailContent,
        receiverMail: to,
        subject,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Password changed successfully",
        data: null,
    });
}));
exports.default = {
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
