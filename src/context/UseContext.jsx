import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api";
// import { useLeadContext } from "./LeadContext";
// import { useSalesContext } from "./SalesAgentsContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  //   const { setLead_List } = useLeadContext();
  //   const { setSalesAgents_List } = useSalesContext();

  const login = async (code) => {
    try {
      const { data } = await authApi.login(code);

      if (data.success) {
        setUser(data.user);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login Error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getMe = async () => {
    try {
      setLoading(true);

      const { data } = await authApi.getMe();

      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { data } = await authApi.logout();

      if (data.success) {
        setUser(null);
        // setLead_List(null);
        // setSalesAgents_List(null);
      }

      return data.success;
    } catch (error) {
      console.error("Logout Error:", error);
      return false;
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        getMe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
