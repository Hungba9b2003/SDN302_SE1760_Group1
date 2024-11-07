import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <style>
        {`
          .admin-navbar {
            background-color: #ff4c24;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .admin-navbar-title h1 {
            color: #fff;
            margin: 0;
          }
          .admin-navbar-links {
            display: flex;
            gap: 15px;
          }
          .admin-navbar-links a {
            color: #fff;
            text-decoration: none;
            padding: 8px 12px;
            border-radius: 4px;
          }
         
          .admin-navbar-links a:hover {
            background-color: #575757;
          }
        `}
      </style>
      <div className="admin-navbar-title">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="admin-navbar-links">
        <Link to="/admin" className="active">
          Dashboard
        </Link>

        <Link to="/admin/account">Account</Link>
        <Link to="/admin/customer">Customer</Link>
        <Link to="/admin/restaurant">Restaurant</Link>
        <Link to="/admin/order">Order</Link>
        <Link to="/admin/report">Reports</Link>
        <Link to="/admin/feedback">Feedback</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
