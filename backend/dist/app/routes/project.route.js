"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = __importDefault(require("../controllers/project.controller"));
const authMiddleWere_1 = __importDefault(require("../middleware/authMiddleWere"));
const router = (0, express_1.Router)();
router.get("/get", project_controller_1.default.getProjects);
router.get("/get/:projectId", project_controller_1.default.getProjectByProjectId);
router.use(authMiddleWere_1.default.isAuthenticateUser, authMiddleWere_1.default.authorizeRoles("admin"));
router.post("/create", project_controller_1.default.createProject);
router.patch("/update/:projectId", project_controller_1.default.updateProjectByProjectId);
router.delete("/delete/:projectId", project_controller_1.default.deleteProjectByProjectId);
const projectRoute = router;
exports.default = projectRoute;
