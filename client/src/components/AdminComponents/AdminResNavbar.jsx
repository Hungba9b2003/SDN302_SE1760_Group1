import React from "react";
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink from react-router-dom
import "../../module/adminRes.css";

const AdminResNavbar = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng trang

  const handleLogout = () => {
    // Xóa token khỏi local storage
    localStorage.removeItem("token");
    // Chuyển hướng về trang chính sau khi đăng xuất
    navigate("/");
  };
  return (
    <nav className="adminres-navbar">
      <div className="adminres-navbar-title">
        <h1>Admin Restaurant Dashboard</h1>
      </div>
      <div className="adminres-navbar-links">
        <NavLink to="/adminres/manage" activeClassName="active">Dishes</NavLink>
        <NavLink to="/adminres/category" activeClassName="active">Category</NavLink>
        <NavLink to="/" onClick={handleLogout} activeClassName="active">Logout</NavLink>
      </div>
    </nav>
  );
};

export default AdminResNavbar;