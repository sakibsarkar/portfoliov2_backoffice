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
const skill_model_1 = __importDefault(require("../models/skill.model"));
const createSkill = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield skill_model_1.default.create(body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "Skill created successfully",
    });
}));
const getSkills = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skill_model_1.default.find();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "Skills retrieved successfully",
    });
}));
const updateSkillBySkillId = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skillId } = req.params;
    const body = req.body;
    const result = yield skill_model_1.default.findByIdAndUpdate(skillId, body, {
        new: true,
        runValidators: true,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "Skill updated successfully",
    });
}));
const deleteSkillBySkillId = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skillId } = req.params;
    const isExist = yield skill_model_1.default.findById(skillId);
    if (!isExist) {
        throw new AppError_1.default(404, "Skill not found");
    }
    const result = yield skill_model_1.default.findByIdAndDelete(isExist._id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "Skill deleted successfully",
    });
}));
const skillController = {
    createSkill,
    getSkills,
    updateSkillBySkillId,
    deleteSkillBySkillId,
};
exports.default = skillController;
