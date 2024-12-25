"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const experience_controller_1 = __importDefault(require("../controllers/experience.controller"));
const authMiddleWere_1 = __importDefault(require("../middleware/authMiddleWere"));
const router = (0, express_1.Router)();
router.get("/get", experience_controller_1.default.getExperiences);
router.use(authMiddleWere_1.default.isAuthenticateUser, authMiddleWere_1.default.authorizeRoles("admin"));
router.post("/create", experience_controller_1.default.createExperience);
router.patch("/update/:experienceId", experience_controller_1.default.updateExperienceByExperienceId);
router.delete("/delete/:experienceId", experience_controller_1.default.deleteExperienceByExperienceId);
const experienceRoute = router;
exports.default = experienceRoute;
