import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UseContext";
import LoadingComp from "./LoadingComp";
import { LeadContextProvider } from "../context/LeadContext";
import SalesAgentsContextProvider from "../context/SalesAgentsContext";
import ReportContextProvider from "../context/ReportContext";

function PrivateRoute() {
  const { user, loading } = useUserContext();

  if (loading) {
    return <LoadingComp message="Checking session..." />;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <LeadContextProvider>
      <SalesAgentsContextProvider>
        <ReportContextProvider>
          <Outlet />
        </ReportContextProvider>
      </SalesAgentsContextProvider>
    </LeadContextProvider>
  );
}

export default PrivateRoute;
