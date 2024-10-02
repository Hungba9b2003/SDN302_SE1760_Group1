import React, { useState, useEffect } from 'react';
import '../../module/admin.css'; // Adjust the path as needed
import AdminNavbar from '../../components/AdminComponents/AdminNavbar';
import AdminSidebar from '../../components/AdminComponents/AdminSidebar';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    // Fetch products from the backend API
    fetch('/api/admin/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddProduct = () => {
    // Add a new product to the backend API
    fetch('/api/admin/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
        setProducts([...products, data]); // Update the product list
        setNewProduct({ name: '', price: '', description: '' }); // Reset the form
      })
      .catch(error => console.error('Error adding product:', error));
  };

  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-content">
        <AdminSidebar />
        <div className="admin-main">
          <h1>Product Management</h1>

          <div className="add-product-form">
            <h2>Add New Product</h2>
            <input 
              type="text" 
              placeholder="Product Name" 
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
            />
            <input 
              type="number" 
              placeholder="Price" 
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
            />
            <textarea 
              placeholder="Description" 
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
            />
            <button onClick={handleAddProduct}>Add Product</button>
          </div>

          <div className="product-list">
            <h2>Existing Products</h2>
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
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.description}</td>
                    <td>
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
