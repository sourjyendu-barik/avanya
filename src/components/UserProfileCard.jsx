import React from "react";
import { useUserContext } from "../context/UseContext";
import { toast } from "react-toastify";

const UserProfileCard = () => {
  const { user, logout } = useUserContext();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  if (!user) return null;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body d-flex align-items-center gap-3">
        <img
          src={user?.profilePhoto || "/default-avatar.png"}
          alt={user?.name || "User"}
          className="rounded-circle border"
          style={{ width: "64px", height: "64px", objectFit: "cover" }}
        />
        <div className="flex-grow-1">
          <h5 className="mb-0">{user?.name}</h5>
          <p className="text-muted small mb-2">{user?.email}</p>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
