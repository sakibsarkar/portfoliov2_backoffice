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
const catchAsyncError_1 = __importDefault(require("../../utils/catchAsyncError"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const AppError_1 = __importDefault(require("../error/AppError"));
const project_model_1 = __importDefault(require("../models/project.model"));
const createProject = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield project_model_1.default.create(body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "Project created successfully",
    });
}));
const getProjects = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.default.find();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "Projects retrieved successfully",
    });
}));
const getProjectByProjectId = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    const result = yield project_model_1.default.findById(projectId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "Project retrieved successfully",
    });
}));
const updateProjectByProjectId = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    const body = req.body;
    const result = yield project_model_1.default.findByIdAndUpdate(projectId, body, {
        new: true,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "Project updated successfully",
    });
}));
const deleteProjectByProjectId = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    const isExist = yield project_model_1.default.findById(projectId);
    if (!isExist) {
        throw new AppError_1.default(404, "Project not found");
    }
    const result = yield project_model_1.default.findByIdAndDelete(isExist._id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "Project deleted successfully",
    });
}));
const projectController = {
    createProject,
    getProjects,
    updateProjectByProjectId,
    deleteProjectByProjectId,
    getProjectByProjectId,
};
exports.default = projectController;
