import React, { useEffect, useState, createContext, useContext } from "react";
import useAxios from "../hooks/useAxios";
import { leadsApi } from "../api";
const LeadContext = createContext();
export const useLeadContext = () => useContext(LeadContext);

export const LeadContextProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    salesAgent: "",
    status: "",
    tags: [],
    source: "",
    sortByAsc: true,
    priority: "",
  });
  const [queryUrl, setQueryUrl] = useState(null);
  const [trigger, setTrigger] = useState(false);
  // console.log(queryUrl);
  const createUrl = (latestFilters) => {
    const params = new URLSearchParams();

    if (latestFilters.salesAgent)
      params.set("salesAgent", latestFilters.salesAgent);
    if (latestFilters.status) params.set("status", latestFilters.status);
    if (latestFilters.priority) params.set("priority", latestFilters.priority);

    if (latestFilters.source) params.set("source", latestFilters.source);
    params.set("sortByAsc", latestFilters.sortByAsc.toString());
    if (latestFilters.tags.length > 0) {
      params.set("tags", latestFilters.tags.join(","));
    }
    params.set("t", trigger);
    const newUrl = `/getAllLeads?${params.toString()}`;
    setQueryUrl(newUrl);
  };

  const refetchLeads = () => {
    setTrigger(!trigger);
  };
  useEffect(() => {
    createUrl(filters);
  }, [filters, trigger]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const clearFilter = () => {
    setFilters((prev) => ({
      salesAgent: "",
      status: "",
      tags: [],
      source: "",
      sortByAsc: true,
      priority: "",
    }));
  };
  const {
    data,
    loading: leadDataloading,
    error: leadLoadingError,
  } = useAxios(queryUrl || null);

  const [lead_List, setLead_List] = useState([]);

  useEffect(() => {
    if (Array.isArray(data?.data)) {
      setLead_List(data.data);
    }
  }, [data]);
  const leadStatusDistribution = lead_List.reduce((acc, curr) => {
    const status = curr.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const deleteLead = async (id) => {
    try {
      const res = await leadsApi.delete(id);

      setTrigger((prev) => !prev);

      return res;
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
  const clearLead = () => setLead_List([]);
  const value = {
    // leadlist rendering
    lead_List,
    setLead_List,
    leadDataloading,
    leadLoadingError,
    clearLead,
    //
    filters,
    updateFilter,
    clearFilter,
    leadStatusDistribution,
    refetchLeads,
    //deleting
    deleteLead,
  };

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
};
