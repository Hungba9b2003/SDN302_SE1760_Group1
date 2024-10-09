import React from 'react';
import '../../module/adminRes.css';

const AdminResSidebar = () => {
  return (
    <aside className="adminres-sidebar">
      <ul>
        <li><a href="/adminres/manage">Dishes</a></li>
        <li><a href="/adminres/dashboard">Dashboard</a></li>
        <li><a href="/adminres/revenue-report">Revenue Report</a></li>
        <li><a href="/adminres/feedback-rating">Feedback & Ratings</a></li>
      </ul>
    </aside>
  );
};

export default AdminResSidebar;
