import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingComp from "./components/LoadingComp";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Signin = lazy(() => import("./pages/Signin"));
const LeadManagement = lazy(() => import("./pages/LeadManagement"));
const Leadlist = lazy(() => import("./pages/Leadlist"));
const AddLead = lazy(() => import("./pages/AddLead"));
const SalesAgents = lazy(() => import("./pages/SalesAgents"));
const AddSalesAgent = lazy(() => import("./pages/AddSalesAgent"));
const Reports = lazy(() => import("./pages/Reports"));
const SalesPage = lazy(() => import("./pages/SalesPage"));
const Settings = lazy(() => import("./pages/Settings"));

const withSuspense = (component, message = "Loading...") => (
  <Suspense fallback={<LoadingComp message={message} />}>{component}</Suspense>
);

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/signin" replace /> },

  {
    element: <PublicRoute />,
    children: [
      {
        path: "/signin",
        element: withSuspense(<Signin />, "Loading Sign In..."),
      },
    ],
  },

  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/dashboard",
        element: withSuspense(<Dashboard />, "Loading Dashboard..."),
      },
      {
        path: "/leads/:lead_id",
        element: withSuspense(<LeadManagement />, "Loading Lead..."),
      },
      {
        path: "/leads",
        element: withSuspense(<Leadlist />, "Loading Leads..."),
      },
      {
        path: "/addLead",
        element: withSuspense(<AddLead />, "Loading Add Lead..."),
      },
      {
        path: "/salesAgents",
        element: withSuspense(<SalesAgents />, "Loading Sales Agents..."),
      },
      {
        path: "/addNewAgent",
        element: withSuspense(<AddSalesAgent />, "Loading Add Agent..."),
      },
      {
        path: "/reports",
        element: withSuspense(<Reports />, "Loading Reports..."),
      },
      {
        path: "/sales",
        element: withSuspense(<SalesPage />, "Loading Sales..."),
      },
      {
        path: "/settings",
        element: withSuspense(<Settings />, "Loading Settings..."),
      },
    ],
  },

  { path: "*", element: <h2 className="p-4">404 Page Not Found</h2> },
]);

export default router;
