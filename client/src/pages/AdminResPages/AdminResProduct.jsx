import React, { useState, useEffect } from 'react';
import '../../module/adminRes.css'; 
import '../../module/ManageProducts.css';
import '../../module/CreateProductPopup.css';
import '../../module/UpdateProductPopup.css';
import AdminNavbar from '../../components/AdminComponents/AdminResNavbar';
import AdminSidebar from '../../components/AdminComponents/AdminResSidebar';

const AdminResProduct = ({ setCreateProduct, setUpdateProduct }) => {
  // const [products, setProducts] = useState([]);
  // const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  // useEffect(() => {
  //   // Fetch products from the backend API
  //   fetch('/api/admin/products')
  //     .then(response => response.json())
  //     .then(data => setProducts(data))
  //     .catch(error => console.error(error));
  // }, []);

  // const handleAddProduct = () => {
  //   // Add a new product to the backend API
  //   fetch('/api/admin/products', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newProduct),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       setProducts([...products, data]); // Update the product list
  //       setNewProduct({ name: '', price: '', description: '' }); // Reset the form
  //     })
  //     .catch(error => console.error('Error adding product:', error));
  // };

  return (
    <div className="adminres-container">
      <AdminNavbar />
      <div className="adminres-content">
        <AdminSidebar />
        <div className="adminres-main">
          <div className='manage'>
            <div className='create'>
            <h1>Dishes Management</h1>
              <button onClick={() => setCreateProduct(true)}>Create Product</button>
            </div>
            <div className='container'>
              <div className='row'>
                <div className='col-md-2'>
                  <select className="form-select" aria-label="Default select example">
                    <option defaultValue={"sdaw"}>Order by</option>
                    <option value="fsa">Alphabet</option>
                    <option value="daw">Price</option>
                  </select>
                </div>
                <div className='col-md-8 search'>
                  <input type="text" placeholder='Search product' />
                </div>
                <div className='col-md-2 search-button'>
                  <button >Search</button>
                </div>
              </div>
            </div>


            <div className="manage-items">
              <div className="manage-items-title row">
                <div className='col-md-2'>
                  <p>Items</p>
                </div>
                <div className='col-md-3'>
                  <p>Dish</p>
                </div>
                <div className='col-md-1'>
                  <p>Price</p>
                </div>
                <div className='col-md-4'>
                  <p>Description</p>
                </div>
                <div className='col-md-2'>
                  <p>Action</p>
                </div>

              </div>

              <hr />
              <div className="row manage-items-title manage-items-item ">
                <div className='col-md-2'>
                  <img src="https://media-api.advertisingvietnam.com/oapi/v1/media?uuid=3aab6b15-7347-48fd-b189-a56870880156&resolution=1000x&keepOriginal=true" alt="" />
                </div>
                <div className='col-md-3'>
                  <p>sd</p>
                </div>
                <div className='col-md-1'>
                  <p>12$</p>
                </div>
                <div className='col-md-4'>
                  <p>Descriptiondddddddddddddddddddddddddbhfdiubiadeshuedawhu</p>
                </div>
                <div className='col-md-1'>
                  <p className='manage-items-remove-icon' onClick={() => setUpdateProduct(true)}><i className="fa-solid fa-pen"></i></p>
                </div>
                <div className='col-md-1'>
                  <p className='manage-items-remove-icon' onClick={() => removeFromManage(item.food_id)}><i className="fa-solid fa-trash"></i></p>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResProduct;
