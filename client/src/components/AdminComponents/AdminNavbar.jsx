import React from "react";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "../../module/admin.css";

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-title">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="admin-navbar-links">
        <Link to="/admin" className="active">
          Dashboard
        </Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/product">Products</Link>
      
        <Link to="/admin/revenue-report">Reports</Link>
        <Link to="/admin/feedback-rating">Feedback</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
