import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import SalesAgentsContextProvider from "./context/SalesAgentsContext";
import ReportContextProvider from "./context/ReportContext";
import { LeadContextProvider } from "./context/LeadContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <LeadContextProvider>
      <SalesAgentsContextProvider>
        <ReportContextProvider>
          <RouterProvider router={router} />
          <ToastContainer position="top-center" autoClose={2000} />
        </ReportContextProvider>
      </SalesAgentsContextProvider>
    </LeadContextProvider>
  );
}

export default App;
