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
  const [image, setImage] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [useNewCategory, setUseNewCategory] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/manage/category');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (dish) {
      setName(dish.name);
      setPrice(dish.price);
      setDescription(dish.description);
      setCategory(dish.category); // Use `dish.category` if it's a single category
      setDiscount(dish.discount || '');
      if (dish.image && dish.image.length > 0) {
        setImage(dish.image.map(imgUrl => ({
          url: imgUrl,
          isNew: false,
        })));
      }
    }
  }, [dish]);

  const handleDeleteImage = (imgUrl) => {
    setImage((prevImages) => prevImages.filter((img) => img.url !== imgUrl));
};

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file,
      isNew: true,
    }));
    setImage(prevImages => [...prevImages, ...newImages]);
  };

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Product name is required';
    if (!price || price <= 0) errors.price = 'Price must be a positive number';
    if (!useNewCategory && !category) errors.category = 'Please select a category';
    if (useNewCategory && !newCategory.trim()) errors.newCategory = 'New category cannot be empty';
    return errors;
  };

  const handleUpdate = async () => {
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0 || error) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('discount', discount);
    const selectedCategory = useNewCategory ? newCategory : category;
    formData.append('category', selectedCategory);

    image.forEach((img) => {
      if (img.isNew) {
        formData.append('image', img.file);
      } else {
        formData.append('existingImages[]', img.url);
      }
    });

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="update-popup">
      <div className="update-popup-container">
        <div className="update-popup-title">
          <h2>Update Product</h2>
          <img onClick={() => setUpdateProduct(false)} src={assets.cross_icon} alt="close" />
        </div>
        <div className="update-popup-inputs">
          <div>Image</div>
          <div className="image-preview-container">
            {image.map((img, index) => (
              <div key={index} className="image-wrapper">
                <img src={img.url} alt={`Dish image ${index + 1}`} className="preview-image" />
                <button className="delete-button" onClick={() => handleDeleteImage(img.url)}>
                  &times;
                </button>
              </div>
            ))}
          </div>
          <input type="file" multiple accept="image/png, image/jpeg" onChange={handleImageChange} />

          <div>Name</div>
          <input type="text" placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} required />
          {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}

          <div>Price</div>
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          {formErrors.price && <p style={{ color: 'red' }}>{formErrors.price}</p>}

          <div>Description</div>
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <div>Category</div>
          {!useNewCategory ? (
            <>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="" disabled>Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              {formErrors.category && <p style={{ color: 'red' }}>{formErrors.category}</p>}
            </>
          ) : (
            <div>
              <input type="text" placeholder="Enter new category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} required />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {formErrors.newCategory && <p style={{ color: 'red' }}>{formErrors.newCategory}</p>}
            </div>
          )}

          <div>
            <input type="checkbox" checked={useNewCategory} onChange={() => setUseNewCategory(!useNewCategory)} />
            <label style={{ marginLeft: "10px" }}>Enter new category</label>
          </div>

          <div>Discount</div>
          <input type="number" placeholder="Discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </div>
        <button onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

UpdateProductPopup.propTypes = {
  setUpdateProduct: PropTypes.func.isRequired,
  dish: PropTypes.object.isRequired,
};

export default UpdateProductPopup;