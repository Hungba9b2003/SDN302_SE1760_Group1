<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import '../../module/adminRes.css';
import '../../module/ManageProducts.css';
import '../../module/CreateProductPopup.css';
import '../../module/UpdateProductPopup.css';
import UpdateProductPopup from './UpdateProductPopup';
import axios from 'axios';
import ConfirmDialog from './ConfirmDialog';
import AdminResNavbar from './../../components/AdminComponents/AdminResNavbar';
import AdminResSidebar from './../../components/AdminComponents/AdminResSidebar';

const AdminResProduct = ({ setCreateProduct }) => {
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [updateProduct, setUpdateProduct] = useState(null);
  const [deleteDishId, setDeleteDishId] = useState(null);
  const [deleteDishName, setDeleteDishName] = useState('');
=======
import React, { useState, useEffect } from "react";
import "../../module/adminRes.css";
import "../../module/ManageProducts.css";
import "../../module/CreateProductPopup.css";
import "../../module/UpdateProductPopup.css";
import AdminNavbar from "../../components/AdminComponents/AdminResNavbar";
import AdminSidebar from "../../components/AdminComponents/AdminResSidebar";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
const AdminResProduct = ({ setCreateProduct, setUpdateProduct }) => {
  // const [products, setProducts] = useState([]);
  // const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
>>>>>>> 1d21618b4dbc0f48b9c0461d695fdff2bc0593a8

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/manage/dish');
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };
    fetchDishes();
  }, []);

  const handleDeleteClick = (id, name) => {
    setDeleteDishId(id);
    setDeleteDishName(name);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/manage/dish/${deleteDishId}`);
      setDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== deleteDishId));
      alert('Dish deleted successfully');
    } catch (error) {
      console.error('Error deleting dish:', error);
    } finally {
      setDeleteDishId(null);
      setDeleteDishName('');
    }
  };

  const cancelDelete = () => {
    setDeleteDishId(null);
    setDeleteDishName('');
  };

  const getFilteredAndSortedDishes = () => {
    let filteredDishes = dishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filteredDishes.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filteredDishes;
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSortChange = (e) => {
    const [key, direction] = e.target.value.split('-');
    setSortConfig({ key, direction });
  };

  const filteredAndSortedDishes = getFilteredAndSortedDishes();

  return (
    <div className="adminres-container">
      <AdminResNavbar />
      <div className="adminres-content">
        <div className="adminres-main">
          <div className="manage">
            <div className="create">
              <h1>Dishes Management</h1>
<<<<<<< HEAD
              <button onClick={() => setCreateProduct(true)}>Create Product</button>
            </div>

            <div className="container">
              <div className="row">
                <div className="custom-col custom-col-1">Sort by: </div>
                <div className="custom-col custom-col-3">
                  <select className="custom-select" onChange={handleSortChange}>
                    <option value="">Select</option>
                    <option value="name-asc">Alphabet (A-Z)</option>
                    <option value="name-desc">Alphabet (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                  </select>
                </div>
                <div className="custom-col custom-col-8 search">
                  <input
                    type="text"
                    placeholder="Search Dishes"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>

            <div className="manage-items card-container">
              {filteredAndSortedDishes.map((dish) => (
                <div className="card" key={dish._id}>
                  <div className="card-image">
                    {dish.image && dish.image.length > 0 ? (
                      <img
                        src={dish.image[0].imagineUrl} // Sử dụng trực tiếp URL từ Cloudinary
                        alt={dish.name}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </div>
                  <div className="card-content">
                    <h2>{dish.name}</h2>
                    <p>{dish.description}</p>
                    <p className="price">{dish.price}$</p>
                    <div className="card-actions">
                      <button style={{backgroundColor:"orange"}} onClick={() => setUpdateProduct(dish)}>Edit</button>
                      <button style={{backgroundColor:"red"}} onClick={() => handleDeleteClick(dish._id, dish.name)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
=======
              <Button onClick={() => setCreateProduct(true)}>
                Create Product
              </Button>
            </div>
            <Container>
              <Row>
                <Col md={2}>
                  <Form.Select aria-label="Order by">
                    <option value="sdaw">Order by</option>
                    <option value="alphabet">Alphabet</option>
                    <option value="price">Price</option>
                  </Form.Select>
                </Col>
                <Col md={8}>
                  <Form.Control type="text" placeholder="Search product" />
                </Col>
                <Col md={2}>
                  <Button variant="primary">Search</Button>
                </Col>
              </Row>
            </Container>

            <div className="manage-items">
              <Row className="manage-items-title">
                <Col md={2}>
                  <p>Items</p>
                </Col>
                <Col md={3}>
                  <p>Dish</p>
                </Col>
                <Col md={1}>
                  <p>Price</p>
                </Col>
                <Col md={4}>
                  <p>Description</p>
                </Col>
                <Col md={2}>
                  <p>Action</p>
                </Col>
              </Row>

              <hr />

              <Row className="manage-items-item">
                <Col md={2}>
                  <Image
                    src="https://media-api.advertisingvietnam.com/oapi/v1/media?uuid=3aab6b15-7347-48fd-b189-a56870880156&resolution=1000x&keepOriginal=true"
                    alt="Dish"
                    fluid
                  />
                </Col>
                <Col md={3}>
                  <p>sd</p>
                </Col>
                <Col md={1}>
                  <p>$12</p>
                </Col>
                <Col md={4}>
                  <p>
                    Descriptiondddddddddddddddddddddddddbhfdiubiadeshuedawhu
                  </p>
                </Col>
                <Col md={1}>
                  <i
                    className="fa-solid fa-pen"
                    onClick={() => setUpdateProduct(true)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </Col>
                <Col md={1}>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => removeFromManage(item.food_id)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </Col>
              </Row>

              <hr />
>>>>>>> 1d21618b4dbc0f48b9c0461d695fdff2bc0593a8
            </div>

            {updateProduct && (
                <UpdateProductPopup setUpdateProduct={setUpdateProduct} dish={updateProduct} />
            )}

            {deleteDishId && (
              <ConfirmDialog
                message={`Are you sure you want to delete ${deleteDishName}?`}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResProduct;