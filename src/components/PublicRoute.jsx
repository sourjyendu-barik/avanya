import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const isAuthenticated = false;
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
