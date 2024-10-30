import React from "react";
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import "../../module/adminRes.css";

const AdminResNavbar = () => {
  return (
    <nav className="adminres-navbar">
      <div className="adminres-navbar-title">
        <h1>Admin Restaurant Dashboard</h1>
      </div>
      <div className="adminres-navbar-links">
        <NavLink to="/adminres/manage" activeClassName="active">Dishes</NavLink>
        <NavLink to="/adminres/category" activeClassName="active">Category</NavLink>
        <NavLink to="/adminres/dashboard" activeClassName="active">Dashboard</NavLink>
        <NavLink to="/adminres/feedback-rating" activeClassName="active">Feedback</NavLink>
        <NavLink to="/" activeClassName="active">Logout</NavLink>
      </div>
    </nav>
  );
};

export default AdminResNavbar;