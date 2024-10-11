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
          <div className="manage">
            <div className="create">
              <h1>Dishes Management</h1>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResProduct;
