import React from "react";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "../../module/adminRes.css";

const AdminResNavbar = () => {
  return (
    <nav className="adminres-navbar">
      <div className="adminres-navbar-title">
        <h1>Admin Restaurant Dashboard</h1>
      </div>
      <div className="adminres-navbar-links">
        <Link to="/adminres/manage" className="active">Dishes</Link>
        <Link to="/adminres/dashboard" >Dashboard</Link>
        <Link to="/adminres/feedback-rating">Feedback</Link>
        <Link to="/adminres/revenue-report">Reports</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
};

export default AdminResNavbar;
