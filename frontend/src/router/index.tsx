import AuthLayout from "@/Layouts/AuthLayout";

import NotFound from "@/pages/shared/NotFound";

import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";
import AdminProtectedRoute from "@/ProtectRoutes/AdminProtectedRoute";
import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./admin.route";
import { authRoutes } from "./auth.route";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [...authRoutes],
  },
  {
    path: "/dashboard",
    element: <AdminDashboardLayout />,
    children: adminRoutes.map((route) => ({
      index: route.index,
      path: route.path,
      element: <AdminProtectedRoute>{route.element}</AdminProtectedRoute>,
    })),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
