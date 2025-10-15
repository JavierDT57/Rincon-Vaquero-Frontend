import React, { useEffect } from "react";
import AdminPanelContainer from "../../containers/admin/AdminPanelContainer";

// Page component to mount the Admin Panel in your router at /admin
export default function AdminPanelPage() {
  useEffect(() => {
    document.title = "Panel Administrativo";
  }, []);

  return (
    <div className="bg-white text-slate-900">
      <AdminPanelContainer />
    </div>
  );
}