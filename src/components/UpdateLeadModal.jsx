import React from "react";
import LeadForm from "./LeadForm";
import { toast } from "react-toastify";
import { leadsApi } from "../api";
const UpdateLeadModal = ({ defaultdata, setTriggerLead }) => {
  if (!defaultdata) {
    return null;
  }
  const updateLead = async (leadFormData) => {
    try {
      const updated_formdata = await leadsApi.update(
        defaultdata._id,
        leadFormData,
      );
      // console.log(updated_formdata);

      toast.success("Updated Lead data successfully");

      // refetchLeads();
      setTriggerLead((prev) => !prev);

      // //modal autoclose
      // const modal = bootstrap.Modal.getInstance(
      //   document.getElementById("addLeadModal")
      // );
      // if (modal) modal.hide();
    } catch (error) {
      // console.log("Error while updating lead data");
      toast.error(error.message);
    }
  };

  return (
    <div
      className="modal fade"
      id="addLeadModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Lead Details</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            <LeadForm
              defaultdata={defaultdata}
              buttonName="Save Lead Data"
              onSubmitFunction={updateLead}
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateLeadModal;
