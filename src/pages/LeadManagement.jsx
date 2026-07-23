import React, { useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router";
import Aside from "../components/Aside";
import useAxios from "../hooks/useAxios";
import UpdateLeadModal from "../components/UpdateLeadModal";
import useSelectList from "../hooks/useSelectList";
import { toast } from "react-toastify";
import { commentsApi } from "../api";
const LeadManagement = () => {
  // code for retrigger api
  const [triggerComment, setTriggerComment] = useState(false);
  const [triggerLead, setTriggerLead] = useState(false);
  //getting the data for select options
  const { salesAgentDataLoading, salesAgentDataLoadingError, sales_agentList } =
    useSelectList();
  //getting the id from url
  const { lead_id } = useParams();

  //current lead data
  const current_lead_data = useAxios(
    `/getLeadData/${lead_id}?t=${triggerLead}`,
  );
  const { data, loading, error } = current_lead_data;
  const current_lead = data?.data;

  //comments data
  const comments = useAxios(`/leads/${lead_id}/comments?t=${triggerComment}`);
  const {
    data: comments_data,
    loading: comments_loading,
    error: comments_error,
  } = comments;

  // codes for adding comments
  const [commentsData, setComments_data] = useState({
    author: "",
    commentText: "",
    lead: lead_id,
  });
  const handleCommentsData = (e) => {
    const { name, value } = e.target;
    setComments_data((prev) => ({ ...prev, [name]: value }));
  };
  const handleformData = async (e) => {
    e.preventDefault();

    try {
      const newCommentsData = await commentsApi.create(commentsData);
      // console.log("savedData", newCommentsData);
      toast.success("new Comments saved successfully");
      setComments_data({
        author: "",
        commentText: "",
        lead: lead_id,
      });

      setTriggerComment(!triggerComment);
    } catch (error) {
      //  console.log(error.message);
      toast.error(error.message);
    }
  };
  //console.log(comments_data);
  return (
    <div className="body">
      <Header>Lead Management</Header>
      <div className="page-content">
        <Aside />
        <div className="main-page">
          {loading && <p>Lead Data is loading</p>}
          {error && <p>Error while loading lead data</p>}
          {current_lead && (
            <div className="lead-details">
              <h2>Details of Lead</h2>

              <ul className="list-group w-100">
                <li className="list-group-item bg-secondary text-white">
                  Lead Name: {current_lead.name}
                </li>
                <li className="list-group-item">
                  Sales Agent:{" "}
                  {current_lead?.salesAgent?.name ?? "Deleted User"}
                </li>
                <li className="list-group-item">
                  Lead Source: {current_lead.source}
                </li>
                <li className="list-group-item">
                  Lead Status: {current_lead.status}
                </li>
                <li className="list-group-item">
                  Priority: {current_lead.priority}
                </li>
                <li className="list-group-item">
                  Time to close: {current_lead.timeToClose}
                </li>
                <li className="list-group-item">
                  Tags : {current_lead.tags.join(" , ")}
                </li>
              </ul>

              <button
                className="btn btn-primary fs-5"
                style={{ alignSelf: "flex-end" }}
                data-bs-toggle="modal"
                data-bs-target="#addLeadModal"
              >
                Edit lead Details
              </button>
            </div>
          )}

          <div className="comment-section">
            <h2>Comments</h2>
            {comments_loading && <p>Comments is loading</p>}
            {comments_error && <p>Error while fetching comments.</p>}
            {comments_data &&
              comments_data.data &&
              comments_data.data.length === 0 && (
                <p>Currently There are no Comments added</p>
              )}
            {comments_data?.data?.length > 0 &&
              comments_data.data.map((data) => {
                const { author, commentText, createdAt } = data;
                return (
                  <div className="card" key={data._id}>
                    <div className="card-body">
                      <div className="card-title">
                        <h5>
                          {author?.name ?? "Deleted User"} ,
                          {createdAt?.split("T")[0] ?? ""}
                        </h5>
                      </div>
                      {commentText}
                    </div>
                  </div>
                );
              })}
            <form onSubmit={handleformData}>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label fw-bold">
                  Add a New Comment
                </label>
                {salesAgentDataLoading && (
                  <span>Salesagent data is loading</span>
                )}
                {salesAgentDataLoadingError && (
                  <span>Error while data is loading</span>
                )}

                <select
                  className="form-control mb-2"
                  name="author"
                  value={commentsData.author}
                  id="author"
                  onChange={handleCommentsData}
                  required
                >
                  <option value="">Select Author</option>
                  {sales_agentList.length > 0 &&
                    sales_agentList.map((a, i) => (
                      <option key={`option${i}`} value={a.value}>
                        {a.label}
                      </option>
                    ))}
                </select>
                <textarea
                  id="comment"
                  className="form-control"
                  rows="4"
                  placeholder="Write your comment here..."
                  name="commentText"
                  value={commentsData.commentText}
                  onChange={handleCommentsData}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary fs-5">
                Add New Comment
              </button>
            </form>
          </div>
        </div>
      </div>
      {current_lead && (
        <UpdateLeadModal
          defaultdata={{
            name: current_lead.name || "",
            source: current_lead.source || "",
            salesAgent: current_lead.salesAgent?._id || "",
            status: current_lead.status || "",
            priority: current_lead.priority || "",
            timeToClose: current_lead.timeToClose || 0,
            tags: Array.isArray(current_lead.tags) ? current_lead.tags : [],
            _id: current_lead._id,
          }}
          setTriggerLead={setTriggerLead}
        />
      )}
    </div>
  );
};

export default LeadManagement;
