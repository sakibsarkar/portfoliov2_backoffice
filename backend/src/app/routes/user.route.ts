/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { multerUpload } from "../config/multerConfig";
import authController from "../controllers/user.controller";
import authMiddleWere from "../middleware/authMiddleWere";
import { validSchema } from "../middleware/validator";
import userValidationSchema from "../validation/auth.validation";

const router = Router();

router.post("/login", authController.login);
// validSchema(userValidationSchema.create),
router.post(
  "/register",

  authController.register
);
router.post(
  "/create-user",

  authController.createUser
);
router.get("/author", authMiddleWere.isAuthenticateUser, authController.author);
router.post(
  "/logout",
  authMiddleWere.isAuthenticateUser,
  authController.logout
);
router.patch(
  "/update",
  validSchema(userValidationSchema.update),
  authMiddleWere.isAuthenticateUser,
  authController.updateProfile
);
router.put(
  "/update-avatar",
  authMiddleWere.isAuthenticateUser,
  multerUpload.single("file"),
  authController.updateProfileAvatar
);
router.post(
  "/refreshToken",
  authMiddleWere.isAuthenticateUser,
  authController.refreshToken
);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password", authController.resetPassword);
router.patch(
  "/change-password",
  authMiddleWere.isAuthenticateUser,
  authController.changePassword
);

const authRoute = router;
export default authRoute;
