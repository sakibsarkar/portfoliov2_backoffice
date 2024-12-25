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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenExpired = exports.hashPassword = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../app/config");
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    return hashedPassword;
});
exports.hashPassword = hashPassword;
const generateAccessToken = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, config_1.config.ACCESS_TOKEN.SECRET, {
        expiresIn: config_1.config.ACCESS_TOKEN.EXPIRES_IN,
    });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.config.ACCESS_TOKEN.SECRET, {
        // expiresIn: "30d",
        expiresIn: config_1.config.ACCESS_TOKEN.EXPIRES_IN,
    });
    return refreshToken;
};
exports.generateRefreshToken = generateRefreshToken;
const isTokenExpired = (token) => {
    if (!token) {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken = jsonwebtoken_1.default.decode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
};
exports.isTokenExpired = isTokenExpired;
exports.default = isTokenExpired;
