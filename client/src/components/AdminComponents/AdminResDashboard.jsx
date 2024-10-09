import React from 'react';
import AdminResNavbar from '../../components/AdminComponents/AdminResNavbar';
import AdminResSidebar from '../../components/AdminComponents/AdminResSidebar';
import '../../module/admin.css';

const AdminResDashboard = () => {
  return (
    <div className="adminres-container">
      <AdminResNavbar />
      <div className="adminres-content">
        <AdminResSidebar />
        <div className="adminres-main">
          <h1>Tomato Dashboard</h1>
          <div className="adminres-stats">
            <div className="stat-card">
              <h2>Total Dish Selled</h2>
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
              <h2>Feedback</h2>
              <p>5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResDashboard;
