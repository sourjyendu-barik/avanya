import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UseContext";
import LoadingComp from "./LoadingComp";

function PrivateRoute() {
  const { user, loading } = useUserContext();

  if (loading) {
    return <LoadingComp message="Checking session..." />;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
