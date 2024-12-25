import { useAppSelector } from "@/redux/hooks";
import Loader from "@/utils/Loader";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, token } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  if (!user || !token) {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
