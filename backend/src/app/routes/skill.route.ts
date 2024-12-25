import { Router } from "express";
import skillController from "../controllers/skill.controller";
import authMiddleWere from "../middleware/authMiddleWere";
const router = Router();
router.get("/get", skillController.getSkills);
router.use(
  authMiddleWere.isAuthenticateUser,
  authMiddleWere.authorizeRoles("admin")
);

router.post("/create", skillController.createSkill);
router.patch("/update/:skillId", skillController.updateSkillBySkillId);
router.delete("/delete/:skillId", skillController.deleteSkillBySkillId);
const skillRoute = router;

export default skillRoute;
