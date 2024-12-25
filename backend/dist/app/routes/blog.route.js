"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = __importDefault(require("../controllers/blog.controller"));
const authMiddleWere_1 = __importDefault(require("../middleware/authMiddleWere"));
const router = (0, express_1.Router)();
router.get("/get", blog_controller_1.default.getBlogs);
router.get("/get/:blogId", blog_controller_1.default.getBlogByBlogId);
router.use(authMiddleWere_1.default.isAuthenticateUser, authMiddleWere_1.default.authorizeRoles("admin"));
router.post("/create", blog_controller_1.default.createBlog);
router.patch("/update/:blogId", blog_controller_1.default.updateBlogByBlogId);
router.delete("/delete/:blogId", blog_controller_1.default.deleteBlogByBlogId);
const blogRoute = router;
exports.default = blogRoute;
