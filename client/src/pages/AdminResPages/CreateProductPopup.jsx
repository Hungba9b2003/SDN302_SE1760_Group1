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
  const [image, setImage] = useState('');
  const [dishes, setDishes] = useState([]);
  const [useNewCategory, setUseNewCategory] = useState(false);
  const [error, setError] = useState(''); // State for error message
  const [formErrors, setFormErrors] = useState({}); // Form validation errors

  // Fetch dishes from server
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/manage/dish');
        
        const uniqueCategories = Array.from(
          new Set(response.data.map((dish) => dish.categories))
        );

        setDishes(uniqueCategories);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };
    fetchDishes();
  }, []);

  // Validate if the new category is unique
  const handleNewCategoryChange = (e) => {
    const inputCategory = e.target.value;
    setNewCategory(inputCategory);

    if (dishes.includes(inputCategory)) {
      setError('Category already exists!');
    } else {
      setError('');
    }
  };

  // Form validation
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
    if (!image) {
      errors.image = 'At least one image must be uploaded';
    }
    return errors;
  };

  // Handle form submission and validation
  const handleCreate = async () => {
    const errors = validateForm();
    setFormErrors(errors);

    // Stop form submission if there are errors
    if (Object.keys(errors).length > 0 || error) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('discount', discount);

    if (image && image.length > 0) {
      for (let i = 0; i < image.length; i++) {
        formData.append('image', image[i]);
      }
    }

    const selectedCategory = useNewCategory ? newCategory : category;
    formData.append('categories', selectedCategory);

    try {
      const response = await axios.post('http://localhost:5000/manage/createDish', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
      alert('Product created successfully');
      window.location.reload();
      setCreateProduct(false);
    } catch (error) {
      console.error('Error creating dish:', error);
      alert('Failed to create product');
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
          <div>Image</div>
          <input
            type="file"
            accept="image/png, image/jpeg"
            multiple
            onChange={(e) => setImage(e.target.files)}
          />
          {formErrors.image && <p style={{ color: 'red' }}>{formErrors.image}</p>}

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
        <button onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
};

CreateProductPopup.propTypes = {
  setCreateProduct: PropTypes.func.isRequired,
};

export default CreateProductPopup;
