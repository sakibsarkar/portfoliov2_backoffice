import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import AdminProtectedRoute from "@/ProtectRoutes/AdminProtectedRoute";
export const authRoutes = [
  {
    index: true,
    path: "",
    element: (
      <AdminProtectedRoute>
        <Home />
      </AdminProtectedRoute>
    ),
  },
  {
    index: true,
    path: "login",
    element: <Login />,
  },
];
