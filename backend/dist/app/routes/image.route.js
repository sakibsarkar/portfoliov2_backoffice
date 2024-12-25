"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multerConfig_1 = require("../config/multerConfig");
const image_controller_1 = require("../controllers/image.controller");
const authMiddleWere_1 = __importDefault(require("../middleware/authMiddleWere"));
const router = (0, express_1.Router)();
router.post("/multi", authMiddleWere_1.default.isAuthenticateUser, authMiddleWere_1.default.authorizeRoles("admin"), multerConfig_1.multerUpload.array("images"), image_controller_1.imageController.uploadMutilpleImages);
router.post("/single", authMiddleWere_1.default.isAuthenticateUser, authMiddleWere_1.default.authorizeRoles("admin"), multerConfig_1.multerUpload.single("image"), image_controller_1.imageController.uploadSingleImage);
const imageRoute = router;
exports.default = imageRoute;
