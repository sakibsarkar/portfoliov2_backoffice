"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const skill_controller_1 = __importDefault(require("../controllers/skill.controller"));
const authMiddleWere_1 = __importDefault(require("../middleware/authMiddleWere"));
const router = (0, express_1.Router)();
router.get("/get", skill_controller_1.default.getSkills);
router.use(authMiddleWere_1.default.isAuthenticateUser, authMiddleWere_1.default.authorizeRoles("admin"));
router.post("/create", skill_controller_1.default.createSkill);
router.patch("/update/:skillId", skill_controller_1.default.updateSkillBySkillId);
router.delete("/delete/:skillId", skill_controller_1.default.deleteSkillBySkillId);
const skillRoute = router;
exports.default = skillRoute;
