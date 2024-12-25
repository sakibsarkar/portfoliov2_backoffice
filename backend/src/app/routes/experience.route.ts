import { Router } from "express";
import experienceController from "../controllers/experience.controller";
import authMiddleWere from "../middleware/authMiddleWere";

const router = Router();

router.get("/get", experienceController.getExperiences);

router.use(
  authMiddleWere.isAuthenticateUser,
  authMiddleWere.authorizeRoles("admin")
);

router.post("/create", experienceController.createExperience);
router.patch(
  "/update/:experienceId",
  experienceController.updateExperienceByExperienceId
);
router.delete(
  "/delete/:experienceId",
  experienceController.deleteExperienceByExperienceId
);
const experienceRoute = router;

export default experienceRoute;
