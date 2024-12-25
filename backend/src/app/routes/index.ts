import { Router } from "express";
import blogRoute from "./blog.route";
import experienceRoute from "./experience.route";
import projectRoute from "./project.route";
import skillRoute from "./skill.route";
import authRoute from "./user.route";
const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/skill",
    route: skillRoute,
  },
  {
    path: "/project",
    route: projectRoute,
  },
  {
    path: "/blog",
    route: blogRoute,
  },
  {
    path: "/experience",
    route: experienceRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
