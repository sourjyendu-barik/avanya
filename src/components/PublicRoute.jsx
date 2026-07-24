import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UseContext";

function PublicRoute() {
  const { user } = useUserContext();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
