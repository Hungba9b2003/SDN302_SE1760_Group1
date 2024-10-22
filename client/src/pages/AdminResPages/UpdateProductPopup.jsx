import React, { useState, useEffect } from "react";
import "../../module/UpdateProductPopup.css";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";
import axios from "axios";

const UpdateProductPopup = ({ setUpdateProduct, dish }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [useNewCategory, setUseNewCategory] = useState(false);
  const [error, setError] = useState(''); // State for error messages
  const [formErrors, setFormErrors] = useState({}); // Form validation errors

  // Fetch categories from the server
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/manage/dish');
        const uniqueCategories = Array.from(
          new Set(response.data.map((dish) => dish.categories))
        );
        setDishes(uniqueCategories);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchDishes();
  }, []);

  // Set initial field values when popup opens
  useEffect(() => {
    if (dish) {
      setName(dish.name);
      setPrice(dish.price);
      setDescription(dish.description);
      setCategory(dish.categories);
      setDiscount(dish.discount || '');
      setExistingImageUrl(
        dish.image && dish.image.length > 0 ? dish.image[0].imagineUrl : ''
      );
    }
  }, [dish]);

  // Validate if the new category already exists
  const handleNewCategoryChange = (e) => {
    const inputCategory = e.target.value;
    setNewCategory(inputCategory);

    if (dishes.includes(inputCategory)) {
      setError('Category already exists!');
    } else {
      setError('');
    }
  };

  // Validate the form before submission
  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Product name is required';
    }
    if (!price || price <= 0) {
      errors.price = 'Price must be a positive number';
    }
    if (!useNewCategory && !category) {
      errors.category = 'Please select a category';
    }
    if (useNewCategory && !newCategory.trim()) {
      errors.newCategory = 'New category cannot be empty';
    }
    return errors;
  };

  // Handle the update product logic
  const handleUpdate = async () => {
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0 || error) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('discount', discount);
    formData.append('categories', useNewCategory ? newCategory : category);

    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:5000/manage/dish/${dish._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Product updated successfully');
      window.location.reload();
      setUpdateProduct(false);
    } catch (error) {
      console.error("Error updating dish:", error);
      alert('Failed to update product');
    }
  };

  return (
    <div className="update-popup">
      <div className="update-popup-container">
        <div className="update-popup-title">
          <h2>Update Product</h2>
          <img
            onClick={() => setUpdateProduct(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>
        <div className="update-popup-inputs">
          <div>Image</div>
          {existingImageUrl && !image && (
            <img
              src={`http://localhost:5000${existingImageUrl}`}
              alt="Current dish"
              style={{ width: '100px', height: 'auto' }}
            />
          )}
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div>Name</div>
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}

          <div>Price</div>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          {formErrors.price && <p style={{ color: 'red' }}>{formErrors.price}</p>}

          <div>Description</div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div>Category</div>
          {!useNewCategory ? (
            <>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>Select category</option>
                {dishes.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {formErrors.category && <p style={{ color: 'red' }}>{formErrors.category}</p>}
            </>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Enter new category"
                value={newCategory}
                onChange={handleNewCategoryChange}
                required
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {formErrors.newCategory && <p style={{ color: 'red' }}>{formErrors.newCategory}</p>}
            </div>
          )}

          <div>
            <input
              type="checkbox"
              checked={useNewCategory}
              onChange={() => setUseNewCategory(!useNewCategory)}
            />
            <label style={{ marginLeft: "10px" }}>Enter new category</label>
          </div>

          <div>Discount</div>
          <input
            type="number"
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

UpdateProductPopup.propTypes = {
  setUpdateProduct: PropTypes.func.isRequired,
  dish: PropTypes.object.isRequired,
};

export default UpdateProductPopup;