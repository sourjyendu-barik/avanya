import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import SalesAgentsContextProvider from "./context/SalesAgentsContext";
import ReportContextProvider from "./context/ReportContext";
import { UserProvider, useUserContext } from "./context/UseContext";
import { LeadContextProvider } from "./context/LeadContext";
import { ToastContainer } from "react-toastify";
import LoadingComp from "./components/LoadingComp";
import Signin from "./pages/Signin";
import { Navigate } from "react-router-dom";
function App() {
  return (
    <UserProvider>
      <AuthGate>
        <LeadContextProvider>
          <SalesAgentsContextProvider>
            <ReportContextProvider>
              <RouterProvider router={router} />
              <ToastContainer position="top-center" autoClose={2000} />
            </ReportContextProvider>
          </SalesAgentsContextProvider>
        </LeadContextProvider>
      </AuthGate>
    </UserProvider>
  );
}
function AuthGate({ children }) {
  const { user, loading } = useUserContext();

  if (loading) return <LoadingComp />;
  if (!user) return <Signin />;

  return children;
}
export default App;
