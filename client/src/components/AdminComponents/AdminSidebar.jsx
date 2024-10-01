import React from 'react';
import '../../module/admin.css';

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <ul>
        <li><a href="/admin">Dashboard</a></li>
        <li><a href="/admin/users">Users</a></li>
        <li><a href="/admin/product">Products</a></li>
        <li><a href="/admin/revenue-report">Revenue Report</a></li>
        <li><a href="/admin/feedback-rating">Feedback & Ratings</a></li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
