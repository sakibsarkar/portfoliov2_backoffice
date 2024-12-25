"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = require("express");
const multerConfig_1 = require("../config/multerConfig");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authMiddleWere_1 = __importDefault(require("../middleware/authMiddleWere"));
const validator_1 = require("../middleware/validator");
const auth_validation_1 = __importDefault(require("../validation/auth.validation"));
const router = (0, express_1.Router)();
router.post("/login", user_controller_1.default.login);
// validSchema(userValidationSchema.create),
router.post("/register", user_controller_1.default.register);
router.post("/create-user", user_controller_1.default.createUser);
router.get("/author", authMiddleWere_1.default.isAuthenticateUser, user_controller_1.default.author);
router.post("/logout", authMiddleWere_1.default.isAuthenticateUser, user_controller_1.default.logout);
router.patch("/update", (0, validator_1.validSchema)(auth_validation_1.default.update), authMiddleWere_1.default.isAuthenticateUser, user_controller_1.default.updateProfile);
router.put("/update-avatar", authMiddleWere_1.default.isAuthenticateUser, multerConfig_1.multerUpload.single("file"), user_controller_1.default.updateProfileAvatar);
router.post("/refreshToken", authMiddleWere_1.default.isAuthenticateUser, user_controller_1.default.refreshToken);
router.post("/forgot-password", user_controller_1.default.forgotPassword);
router.patch("/reset-password", user_controller_1.default.resetPassword);
router.patch("/change-password", authMiddleWere_1.default.isAuthenticateUser, user_controller_1.default.changePassword);
const authRoute = router;
exports.default = authRoute;
