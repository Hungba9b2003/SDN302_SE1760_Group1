import React, { useState, useEffect } from 'react';
import '../../module/adminRes.css';
import '../../module/ManageProducts.css';
import '../../module/CreateProductPopup.css';
import UpdateProductPopup from './UpdateProductPopup';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import ConfirmDialog from './ConfirmDialog';
import AdminResNavbar from './../../components/AdminComponents/AdminResNavbar';
import AdminResSidebar from './../../components/AdminComponents/AdminResSidebar';

const AdminResProduct = ({ setCreateProduct }) => {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [updateProduct, setUpdateProduct] = useState(null);
  const [deleteDishId, setDeleteDishId] = useState(null);
  const [deleteDishName, setDeleteDishName] = useState("");

  useEffect(() => {
    const fetchDishes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to access this page.");
        navigate("/");
        return;
      }
  
      try {
        const response = await axios.get('http://localhost:5000/manage/dish/restaurant', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDishes(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expired or unauthorized
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("token"); // Xóa token
          navigate("/"); // Chuyển hướng về trang chính
        } else {
          console.error('Error fetching dishes:', error);
        }
      }
    };
    fetchDishes();
  }, [navigate]);

  const handleDeleteClick = (id, name) => {
    setDeleteDishId(id);
    setDeleteDishName(name);
  };

  const confirmDelete = async () => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/manage/dish/${deleteDishId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== deleteDishId));
        alert('Dish deleted successfully');
    } catch (error) {
        console.error('Error deleting dish:', error);
        if (error.response && error.response.status === 401) {
            alert("Your session has expired. Please log in again.");
            localStorage.removeItem("token");
            navigate("/");
        }
    } finally {
        setDeleteDishId(null);
        setDeleteDishName('');
    }
};
  const cancelDelete = () => {
    setDeleteDishId(null);
    setDeleteDishName("");
  };

  const getFilteredAndSortedDishes = () => {
    let filteredDishes = dishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filteredDishes.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filteredDishes;
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSortChange = (e) => {
    const [key, direction] = e.target.value.split("-");
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
              <button onClick={() => setCreateProduct(true)}>
                Create Product
              </button>
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
                      <img src={dish.image[0]} alt={dish.name} />
                    ) : (
                      <span>No Image</span>
                    )}
                  </div>
                  <div className="card-content">
                    <h2>{dish.name}</h2>
                    <p>{dish.description}</p>
                    <p className="price">{dish.price}$</p>
                    <div className="card-actions">
                      <button
                        style={{ backgroundColor: "orange" }}
                        onClick={() => setUpdateProduct(dish)}
                      >
                        Edit
                      </button>
                      <button
                        style={{ backgroundColor: "red" }}
                        onClick={() => handleDeleteClick(dish._id, dish.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {updateProduct && (
              <UpdateProductPopup
                setUpdateProduct={setUpdateProduct}
                dish={updateProduct}
              />
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
