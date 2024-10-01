import React from 'react';
import AdminNavbar from '../../components/AdminComponents/AdminNavbar';
import AdminSidebar from '../../components/AdminComponents/AdminSidebar';
import '../../module/admin.css';

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-content">
        <AdminSidebar />
        <div className="admin-main">
          <h1>Tomato Dashboard</h1>
          <div className="admin-stats">
            <div className="stat-card">
              <h2>Total Users</h2>
              <p>250</p>
            </div>
            <div className="stat-card">
              <h2>Total Revenue</h2>
              <p>₫10,000,000</p>
            </div>
            <div className="stat-card">
              <h2>Active Orders</h2>
              <p>40</p>
            </div>
            <div className="stat-card">
              <h2>Pending Feedback</h2>
              <p>5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
