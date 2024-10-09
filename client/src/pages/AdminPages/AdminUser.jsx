import React, { useState, useEffect } from "react";
import "../../module/admin.css";
import AdminNavbar from "../../components/AdminComponents/AdminNavbar";
import AdminSidebar from "../../components/AdminComponents/AdminSidebar";

import CreatePopup from "../../components/AdminComponents/CreatePopUp";
import UpdateProductPopup from "../../components/AdminComponents/EditPopUp";

const AdminUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Customer",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Admin",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      role: "Restaurant Owner",
    },
  ]);

  const [createProduct, setCreateProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-content">
        <AdminSidebar />
        <div className="admin-main">
          <h1>Users Management</h1>
          <button onClick={() => setCreateProduct(true)}>
              Create User
            </button>
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}  onClick={() => setUpdateProduct(true)}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {createProduct && <CreatePopup setCreateProduct={setCreateProduct} />}
      {updateProduct && <UpdateProductPopup setUpdateProduct={setUpdateProduct} />}
    </div>
  );
};

export default AdminUsers;
