import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
