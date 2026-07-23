import React, { createContext, useContext } from "react";
import useAxios from "../hooks/useAxios";
import { reportsApi } from "../api";

const ReportContext = createContext();
export const useReportContext = () => useContext(ReportContext);

const ReportContextProvider = ({ children }) => {
  //  CLOSED LEADS
  const {
    data: closed_leads_data,
    loading: closed_data_loading,
    error: closed_data_error,
  } = useAxios("/report/last-week");

  const total_closed_leads = closed_leads_data?.data?.length || 0;

  // Agent wise closed leads
  const agent_wise_ClosedLead =
    closed_leads_data?.data?.reduce((acc, curr) => {
      const agentName = curr?.salesAgent?.name;
      acc[agentName] = (acc[agentName] || 0) + 1;
      return acc;
    }, {}) || {};

  //  PIPELINE DATA
  const { data: leadsIn_pipeline_data } = useAxios("/report/pipeline");
  const leadsIn_pipeline = leadsIn_pipeline_data?.totalLeadsInpieline;
  //  FINAL VALUE
  const value = {
    total_closed_leads,
    closed_leads_data,
    leadsIn_pipeline,
    agent_wise_ClosedLead,
  };

  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
};

export default ReportContextProvider;
