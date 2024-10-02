import React from 'react';
import AdminNavbar from '../../components/AdminComponents/AdminNavbar';
import AdminSidebar from '../../components/AdminComponents/AdminSidebar';
import '../../module/admin.css';

const AdminHome = () => {
  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-content">
        <AdminSidebar />
        <div className="admin-main">
          <h1>Welcome to Admin Dashboard</h1>
          <div className="admin-stats">
            <div className="stat-card">Total Users: 250</div>
            <div className="stat-card">Active Orders: 40</div>
            <div className="stat-card">Pending Issues: 5</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
