import React, { useState } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { useSalesContext } from "../context/SalesAgentsContext";
import { salesAgentsApi } from "../api";
const AddSalesAgent = () => {
  const { setTriggerSalesAgent } = useSalesContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFotmData = async (e) => {
    e.preventDefault();
    try {
      const response = await salesAgentsApi.create(formData);
      // console.log("Data added successfully", response.data);
      toast.success("Added New Sales Agent successfully");

      setFormData({
        name: "",
        email: "",
      });
      setTriggerSalesAgent((prev) => !prev);
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="body">
      <Header> Add New Sales Agent </Header>
      <div className="page-content">
        <div className="main-page">
          <form onSubmit={handleFotmData} className="p-3">
            <div className="mb-3 row align-items-center">
              <label htmlFor="agentName" className="col-sm-2 col-form-label">
                Agent Name:
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  id="agentName"
                  placeholder="Add New sales agent"
                  name="name"
                  value={formData.name}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row align-items-center">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email Address:
              </label>
              <div className="col-sm-6">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email address"
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-secondary">
              Create New Agent
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSalesAgent;
