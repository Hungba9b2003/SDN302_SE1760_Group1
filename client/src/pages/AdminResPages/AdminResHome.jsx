import React from 'react';
import AdminNavbar from '../../components/AdminComponents/AdminResNavbar';
import AdminSidebar from '../../components/AdminComponents/AdminResSidebar';
import '../../module/adminRes.css';

const AdminResHome = () => {
  return (
    <div className="adminres-container">
      <AdminNavbar />
      <div className="adminres-content">
        <AdminSidebar />
        <div className="adminres-main">
          <h1>Welcome to Admin Dashboard</h1>
          <div className="adminres-stats">
            <div className="stat-card">Total Users: 250</div>
            <div className="stat-card">Active Orders: 40</div>
            <div className="stat-card">Pending Issues: 5</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResHome;
