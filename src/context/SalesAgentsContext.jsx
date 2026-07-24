import React, { useEffect } from "react";
import { useContext, createContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import { salesAgentsApi } from "../api";
const SalesAgentsContext = createContext();
export const useSalesContext = () => useContext(SalesAgentsContext);

const SalesAgentsContextProvider = ({ children }) => {
  const [trigger, setTriggerSalesAgent] = useState(false);
  const {
    data,
    loading: salesAgentDataLoading,
    error: salesAgentDataLoadingError,
  } = useAxios(`/getAllSalesAgents?t=${trigger}`);
  const [SalesAgents_List, setSalesAgents_List] = useState([]);
  useEffect(() => {
    if (Array.isArray(data?.data) && data.data.length > 0) {
      setSalesAgents_List(data.data);
    }
  }, [data]);
  const deleteAgent = async (id) => {
    try {
      const res = await salesAgentsApi.delete(id);
      setSalesAgents_List((prev) => prev.filter((a) => a._id !== id));
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };
  const clearAgent = () => setSalesAgents_List([]);
  const value = {
    SalesAgents_List,
    setSalesAgents_List,
    salesAgentDataLoading,
    salesAgentDataLoadingError,
    setTriggerSalesAgent,
    clearAgent,
    //delete agent
    deleteAgent,
  };
  return (
    <SalesAgentsContext.Provider value={value}>
      {children}
    </SalesAgentsContext.Provider>
  );
};

export default SalesAgentsContextProvider;
