import React from "react";
import Header from "../components/Header";
import Aside from "../components/Aside";
import LeadForm from "../components/LeadForm";
import { useLeadContext } from "../context/LeadContext";
import { toast } from "react-toastify";
import { leadsApi } from "../api";
const AddLead = () => {
  const { refetchLeads } = useLeadContext();
  const defaultFormData = {
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: [], // array of strings
    timeToClose: "",
    priority: "",
  };
  const handleForm = async (leadFormData) => {
    try {
      const saved_formdata = await leadsApi.create(leadFormData);
      // console.log(saved_formdata);
      toast.success("Added Lead data successfully");
      refetchLeads();
    } catch (error) {
      // console.log("Error while adding form data");
      toast.error("Error while adding lead data", error.message);
    }
  };
  return (
    <div className="body">
      <Header>Add New Lead</Header>

      <div className="page-content">
        <Aside />

        <div className="main-page  col-12 col-md-12 col-lg-8">
          <LeadForm
            defaultdata={defaultFormData}
            buttonName="Save Lead Data"
            onSubmitFunction={handleForm}
          />
        </div>
      </div>
    </div>
  );
};

export default AddLead;
