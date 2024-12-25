import { Router } from "express";
import { multerUpload } from "../config/multerConfig";
import { imageController } from "../controllers/image.controller";
import authMiddleWere from "../middleware/authMiddleWere";
const router = Router();
router.post(
  "/upload/multi",
  authMiddleWere.isAuthenticateUser,
  authMiddleWere.authorizeRoles("admin"),
  multerUpload.array("images"),
  imageController.uploadMutilpleImages
);
router.post(
  "/upload/single",
  authMiddleWere.isAuthenticateUser,
  authMiddleWere.authorizeRoles("admin"),
  multerUpload.single("image"),
  imageController.uploadSingleImage
);
const imageRoute = router;
export default imageRoute;
