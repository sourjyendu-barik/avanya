import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { UserProvider, useUserContext } from "./context/UseContext";
import { ToastContainer } from "react-toastify";
import LoadingComp from "./components/LoadingComp";
import { Navigate } from "react-router-dom";
function App() {
  return (
    <UserProvider>
      <AuthGate>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" autoClose={2000} />
      </AuthGate>
    </UserProvider>
  );
}
function AuthGate({ children }) {
  const { user, loading } = useUserContext();

  if (loading) return <LoadingComp />;
  // if (!user) return <Signin />;

  return children;
}
export default App;
