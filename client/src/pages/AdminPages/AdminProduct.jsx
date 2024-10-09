import React, { useState } from "react";
import "../../module/admin.css";
import AdminNavbar from "../../components/AdminComponents/AdminNavbar";
import AdminSidebar from "../../components/AdminComponents/AdminSidebar";

import CreatePopup from "../../components/AdminComponents/CreatePopUp";
import UpdateProductPopup from "../../components/AdminComponents/EditPopUp";

const ProductManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Pizza Margherita",
      price: 10.99,
      description:
        "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil.",
    },
    {
      id: 2,
      name: "California Roll",
      price: 12.5,
      description: "Sushi roll with avocado, cucumber, and crabmeat.",
    },
    {
      id: 3,
      name: "Chicken Fried Rice",
      price: 8.99,
      description: "Fried rice with chicken, vegetables, and egg.",
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
          <h1>Product Management</h1>

          <div className="product-list">
            <h2>List Products</h2>
            <button onClick={() => setCreateProduct(true)}>
              Create Product
            </button>
            <table className="product-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} onClick={() => setUpdateProduct(true)}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.description}</td>
                    <td>
                      <button className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
      {createProduct && <CreatePopup setCreateProduct={setCreateProduct} />}
      {updateProduct && <UpdateProductPopup setUpdateProduct={setUpdateProduct} />}

    </div>
  );
};

export default ProductManagement;
