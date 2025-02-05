"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data.statusCode || 200).json({
        success: data.success,
        statusCode: data.statusCode || 200,
        message: data.message,
        data: data.data,
        totalDoc: data.totalDoc
    });
};
exports.default = sendResponse;
