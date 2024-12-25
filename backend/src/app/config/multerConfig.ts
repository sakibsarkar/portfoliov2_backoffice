import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";
const storage = new CloudinaryStorage({
  cloudinary,
});

export const multerUpload = multer({ storage });
