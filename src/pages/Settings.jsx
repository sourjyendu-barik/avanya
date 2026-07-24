import React from "react";
import Header from "../components/Header";
import Aside from "../components/Aside";
import { useLeadContext } from "../context/LeadContext";
import { useSalesContext } from "../context/SalesAgentsContext";
import { toast } from "react-toastify";
import useRefresh from "../hooks/useRefresh";
import UserProfileCard from "../components/UserProfileCard";
const Settings = () => {
  useRefresh();
  const {
    lead_List,
    deleteLead,
    delete_data: delete_leadData,
    deleting_leadData,
    deleting_leadData_error,
  } = useLeadContext();
  const {
    SalesAgents_List,
    deleteAgent,
    deletingAgentData,
    deleting_SalesAgentData,
    deleting_SalesAgentData_error,
  } = useSalesContext();
  console.log(lead_List);
  return (
    <div className="body">
      <Header>Settings</Header>
      <div className="page-content">
        <Aside />
        <div className="main-page">
          <UserProfileCard />
          <h1>Lead List and Sales Agent List</h1>
          {/* lead list  */}
          <div>
            <h2>Lead List</h2>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {lead_List.map((l) => (
                  <tr key={l._id}>
                    <td>{l.name}</td>
                    <td>{l.status}</td>
                    <td>
                      <span
                        onClick={() => {
                          toast.success("Deleted Lead Data Successfully");
                          deleteLead(l._id);
                        }}
                      >
                        🗑️
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* salesAgent list */}
          <div>
            <h2>Sales Agent List</h2>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Sales Agent</th>
                  <th>Action</th>
                </tr>
                {SalesAgents_List.map((a) => (
                  <tr key={a._id}>
                    <td>{a.name}</td>
                    <td>{a.email}</td>
                    <td>
                      <span
                        onClick={() => {
                          toast.success("Deleted Lead Data Successfully");
                          deleteAgent(a._id);
                        }}
                      >
                        🗑️
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
