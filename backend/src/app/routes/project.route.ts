import { Router } from "express";
import projectController from "../controllers/project.controller";
import authMiddleWere from "../middleware/authMiddleWere";

const router = Router();
router.get("/get", projectController.getProjects);
router.get("/get/:projectId", projectController.getProjectByProjectId);

router.use(
  authMiddleWere.isAuthenticateUser,
  authMiddleWere.authorizeRoles("admin")
);
router.post("/create", projectController.createProject);
router.patch("/update/:projectId", projectController.updateProjectByProjectId);
router.delete("/delete/:projectId", projectController.deleteProjectByProjectId);
const projectRoute = router;
export default projectRoute;
