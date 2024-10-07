import React, { useState } from 'react'
import './CreateProductPopup.css'
import { assets } from '../../assets/assets'
import PropTypes from 'prop-types';


const CreateProductPopup = ({ setCreateProduct }) => {

  const [currState, setCurrState] = useState("create");

  return (
    <div className='create-popup'>
      <div className="create-popup-container">
        <div className="create-popup-title">
          <h2>{currState}</h2> <img onClick={() => setCreateProduct(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="create-popup-inputs">
          <div  >Image</div>
          <input type="text" placeholder='Image url' />
          <div>Name</div>
          <input type="text" placeholder='Product name' />
          <div>Price</div>
          <input type="text" placeholder='Price' />
          <div>Description</div>
          <input type="text" placeholder='description' />
          <div>Category</div>
          <select className="form-select" aria-label="Default select example">
            <option defaultValue={"sdaw"}>noddle</option>
            <option value="fsa">dessert </option>
            <option value="daw">snack</option>
            <option value="ewad">drink</option>
          </select>

        </div>
        <button>Create</button>
      </div>
    </div>
  )

};
CreateProductPopup.propTypes = {
  setCreateProduct: PropTypes.func.isRequired,
};


export default CreateProductPopup
