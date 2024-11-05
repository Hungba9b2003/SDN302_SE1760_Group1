import React, { useState, useEffect } from 'react';
import '../../module/CreateProductPopup.css';
import { assets } from '../../assets/assets';
import PropTypes from 'prop-types';
import axios from 'axios';

const CreateProductPopup = ({ setCreateProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [useNewCategory, setUseNewCategory] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/manage/category');
        setCategories(response.data.map((category) => category.name));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImage(files);
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previewUrls);
  };

  const handleNewCategoryChange = (e) => {
    const inputCategory = e.target.value;
    setNewCategory(inputCategory);

    if (categories.includes(inputCategory)) {
      setError('Category already exists!');
    } else {
      setError('');
    }
  };

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
    if (!image || image.length === 0) {
      errors.image = 'At least one image must be uploaded';
    }
    return errors;
  };

  const handleCreate = async () => {
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
  
    const selectedCategory = useNewCategory ? newCategory : category;
    formData.append('categories', selectedCategory);
  
    if (image && image.length > 0) {
      image.forEach((img) => formData.append('image', img));
    }
  
    setIsLoading(true);
    try {
      // Create the dish and automatically add it to the restaurant's menu
      const response = await axios.post('http://localhost:5000/manage/create-dish', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      alert('Product created and added to the menu successfully');
      window.location.reload();
      setCreateProduct(false);
    } catch (error) {
      console.error('Error creating dish:', error);
      alert('Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='create-popup'>
      <div className="create-popup-container">
        <div className="create-popup-title">
          <h2>Create Product</h2>
          <img onClick={() => setCreateProduct(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="create-popup-inputs">
          {/* Input fields */}
          <div>Image</div>
          <input
            type="file"
            accept="image/png, image/jpeg"
            multiple
            onChange={handleImageChange}
          />
          {formErrors.image && <p style={{ color: 'red' }}>{formErrors.image}</p>}

          <div className="image-preview-container">
            {imagePreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`Preview ${index + 1}`} className="preview-image" />
            ))}
          </div>

          {/* Other input fields */}
          <div>Name</div>
          <input
            type="text"
            placeholder='Product name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}

          <div>Price</div>
          <input
            type="number"
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          {formErrors.price && <p style={{ color: 'red' }}>{formErrors.price}</p>}

          {/* Additional fields */}
          <div>Description</div>
          <input
            type="text"
            placeholder='Description'
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
                {categories.map((cat, index) => (
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
            <label style={{ marginLeft: '10px' }}>
              Enter new category
            </label>
          </div>

          <div>Discount</div>
          <input
            type="text"
            placeholder='Discount'
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        
        {/* Display loading indicator when creating product */}
        <button onClick={handleCreate} disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </button>
      </div>
    </div>
  );
};

CreateProductPopup.propTypes = {
  setCreateProduct: PropTypes.func.isRequired,
};

export default CreateProductPopup;