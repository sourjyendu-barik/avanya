import React, { createContext, useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const ReportContext = createContext();
export const useReportContext = () => useContext(ReportContext);

const ReportContextProvider = ({ children }) => {
  // CLOSED LEADS
  const {
    data: closed_leads_data,
    loading: closed_data_loading,
    error: closed_data_error,
  } = useAxios("/report/last-week");

  // PIPELINE DATA
  const { data: leadsIn_pipeline_data } = useAxios("/report/pipeline");

  // States
  const [total_closed_leads, setTotalClosedLeads] = useState(0);
  const [closed_leads, setClosedLeads] = useState([]);
  const [agent_wise_ClosedLead, setAgentWiseClosedLead] = useState({});
  const [leadsIn_pipeline, setLeadsInPipeline] = useState(0);

  // Update closed leads
  useEffect(() => {
    const data = closed_leads_data?.data || [];

    setClosedLeads(data);
    setTotalClosedLeads(data.length);

    const agentWise = data.reduce((acc, curr) => {
      const agentName = curr?.salesAgent?.name;
      acc[agentName] = (acc[agentName] || 0) + 1;
      return acc;
    }, {});

    setAgentWiseClosedLead(agentWise);
  }, [closed_leads_data]);

  // Update pipeline
  useEffect(() => {
    setLeadsInPipeline(leadsIn_pipeline_data?.totalLeadsInpieline || 0);
  }, [leadsIn_pipeline_data]);

  // Clear all report data
  const clearReportData = () => {
    setTotalClosedLeads(0);
    setClosedLeads([]);
    setAgentWiseClosedLead({});
    setLeadsInPipeline(0);
  };

  // FINAL VALUE
  const value = {
    total_closed_leads,
    closed_leads_data: closed_leads,
    closed_data_loading,
    closed_data_error,
    leadsIn_pipeline,
    agent_wise_ClosedLead,
    clearReportData,
  };

  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
};

export default ReportContextProvider;
