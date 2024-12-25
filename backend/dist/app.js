"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import cookieParser from 'cookie-parser'
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./app/config");
const globalErrorHanlder_1 = __importDefault(require("./app/middleware/globalErrorHanlder"));
const not_found_1 = require("./app/middleware/not-found");
const routes_1 = __importDefault(require("./app/routes"));
const sendResponse_1 = __importDefault(require("./utils/sendResponse"));
const app = (0, express_1.default)();
// middlewares
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    origin: [config_1.config.BASE_SITE, "http://localhost:5173"],
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/api/v1", routes_1.default);
app.get("/", (_, res) => {
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "welcome",
        data: null,
    });
});
// 404 handler
app.all("*", not_found_1.notFound);
// global error handler
app.use(globalErrorHanlder_1.default);
exports.default = app;
