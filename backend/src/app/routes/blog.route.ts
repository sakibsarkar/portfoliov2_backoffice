import { Router } from "express";
import blogController from "../controllers/blog.controller";
import authMiddleWere from "../middleware/authMiddleWere";

const router = Router();
router.get("/get", blogController.getBlogs);
router.get("/get/:blogId", blogController.getBlogByBlogId);
router.use(
  authMiddleWere.isAuthenticateUser,
  authMiddleWere.authorizeRoles("admin")
);
router.post("/create", blogController.createBlog);
router.patch("/update/:blogId", blogController.updateBlogByBlogId);
router.delete("/delete/:blogId", blogController.deleteBlogByBlogId);
const blogRoute = router;
export default blogRoute;
