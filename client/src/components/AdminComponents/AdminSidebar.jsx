import React from "react";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <style>
        {`
          .admin-sidebar {
            background-color: #f4f4f4;
            padding: 20px;
            width: 250px;
            height: 100vh;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
          }
          .admin-sidebar ul {
            list-style-type: none;
            padding: 0;
          }
          .admin-sidebar li {
            margin: 15px 0;
          }
          .admin-sidebar a {
            text-decoration: none;
            color: #333;
            padding: 10px;
            display: block;
            border-radius: 4px;
          }
          .admin-sidebar a:hover {
            background-color: #ddd;
          }
        `}
      </style>
      <ul>
        <li>
          <a href="/admin">Dashboard</a>
        </li>
        <li>
          <a href="/admin/account">Account</a>
        </li>
        <li>
          <a href="/admin/customer">Customer</a>
        </li>
        <li>
          <a href="/admin/restaurant">Restaurant</a>
        </li>
        <li>
          <a href="/admin/order">Order</a>
        </li>
        <li>
          <a href="/admin/report">Reports</a>
        </li>
        <li>
          <a href="/admin/feedback">Feedback</a>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
