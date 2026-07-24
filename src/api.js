import axios from "axios";

const api = axios.create({
  baseURL: "https://avanya-backend.vercel.app",
  //baseURL: "http://localhost:3000",
  withCredentials: true,
});

//auth apis
export const authApi = {
  login: (code) => api.post("/auth/login", { code }),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/getMe"),
};

export const leadsApi = {
  getAll: (params = {}) => api.get("/getAllLeads", { params }),
  getById: (leadId, params = {}) =>
    api.get(`/getLeadData/${leadId}`, { params }),
  create: (payload) => api.post("/addNewLead", payload),
  update: (leadId, payload) => api.post(`/updateLeadData/${leadId}`, payload),
  delete: (leadId) => api.delete(`/deleteLead/${leadId}`),
};

export const salesAgentsApi = {
  getAll: (params = {}) => api.get("/getAllSalesAgents", { params }),
  create: (payload) => api.post("/addSalesAgent", payload),
  delete: (salesAgentId) => api.delete(`/deletesalesAgent/${salesAgentId}`),
};

export const reportsApi = {
  getLastWeekClosedLeads: () => api.get("/report/last-week"),
  getPipeline: () => api.get("/report/pipeline"),
};

export const commentsApi = {
  getByLeadId: (leadId, params = {}) =>
    api.get(`/leads/${leadId}/comments`, { params }),
  create: (payload) => api.post("/addComments", payload),
};

export default api;
