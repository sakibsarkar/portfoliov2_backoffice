"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_route_1 = __importDefault(require("./blog.route"));
const experience_route_1 = __importDefault(require("./experience.route"));
const project_route_1 = __importDefault(require("./project.route"));
const skill_route_1 = __importDefault(require("./skill.route"));
const user_route_1 = __importDefault(require("./user.route"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: user_route_1.default,
    },
    {
        path: "/skill",
        route: skill_route_1.default,
    },
    {
        path: "/project",
        route: project_route_1.default,
    },
    {
        path: "/blog",
        route: blog_route_1.default,
    },
    {
        path: "/experience",
        route: experience_route_1.default,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
