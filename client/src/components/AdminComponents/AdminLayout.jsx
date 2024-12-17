import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "../../module/admin.css";

const styles = {
  layoutWrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  layout: {
    display: "flex",
    flex: 1,
    marginTop: "60px", // Offset for fixed navbar
  },
  content: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#fff",
    minHeight: "calc(100vh - 60px)", // Ensure content area takes full height
    overflowY: "auto",
    boxSizing: "border-box",
  },
};

const AdminLayout = () => {
  return (
    <div style={styles.layoutWrapper}>
      <div className="admin-navbar">
        <AdminNavbar />
      </div>
      <div style={styles.layout}>
        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
