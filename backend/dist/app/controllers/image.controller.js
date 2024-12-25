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
exports.imageController = void 0;
const catchAsyncError_1 = __importDefault(require("../../utils/catchAsyncError"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const uploadMutilpleImages = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    if (!files) {
        (0, sendResponse_1.default)(res, {
            data: null,
            success: false,
            message: "File not found",
        });
        return;
    }
    const urls = files.map((file) => file.path);
    (0, sendResponse_1.default)(res, {
        data: urls,
        success: true,
        message: "File uploaded successfully",
        statusCode: 200,
    });
}));
const uploadSingleImage = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        (0, sendResponse_1.default)(res, {
            data: null,
            success: false,
            message: "File not found",
        });
        return;
    }
    const url = file.path;
    (0, sendResponse_1.default)(res, {
        data: url,
        success: true,
        message: "File uploaded successfully",
        statusCode: 200,
    });
}));
exports.imageController = {
    uploadMutilpleImages,
    uploadSingleImage,
};
