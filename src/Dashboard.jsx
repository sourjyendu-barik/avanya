import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import Header from "./components/Header";
import AppComponentCards from "./components/AppComponent/AppComponentCards";
import NavAside from "./components/AppComponent/NavAside";
import { Link } from "react-router-dom";
import { useLeadContext } from "./context/LeadContext";
import SelectDropDown from "./components/LeadlistComponent/SelectDropDown";
import useSelectList from "./hooks/useSelectList";
import useRefresh from "./hooks/useRefresh";

function Dashboard() {
  const { updateFilter, filters, leadStatusDistribution } = useLeadContext();
  const { leadStatusList } = useSelectList();

  useRefresh();

  return (
    <div className="body">
      <Header>Anvaya CRM Dashboard</Header>
      <div className="page-content">
        <NavAside />
        <main className="main-page">
          <AppComponentCards />
          <div className="lead-status mt-4">
            <h3>Status:</h3>
            <ul>
              {Object.keys(leadStatusDistribution).map((k) => (
                <li key={k}>
                  {k} : {leadStatusDistribution[k]}
                </li>
              ))}
            </ul>
          </div>
          <div className="row g-3 d-flex justify-content-between align-items-end">
            <div className="col-12 col-md-6 col-lg-4 col-xl-3">
              <SelectDropDown
                label="Lead Status"
                options={[...leadStatusList, { label: "All", value: "" }]}
                value={
                  leadStatusList.find((o) => o.value === filters.status) || null
                }
                onChange={(selected) => updateFilter("status", selected?.value)}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex align-items-end">
              <Link to="/addLead" className="btn btn-secondary w-100">
                Add New Lead
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
