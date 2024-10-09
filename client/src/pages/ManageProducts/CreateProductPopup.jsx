import React, { useState } from 'react'
import './CreateProductPopup.css'
import { assets } from '../../assets/assets'
import PropTypes from 'prop-types';


const CreateProductPopup = ({setCreateProduct}) => {

    const [currState,setCurrState] = useState("create");

  return (
    <div className='create-popup'>
        <div className="create-popup-container">
            <div className="create-popup-title">
                <h2>{currState}</h2> <img onClick={()=>setCreateProduct(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="create-popup-inputs">
                <input type="text" placeholder='Product name' />
                <input type="text" placeholder='Price' />
                <input type="number" placeholder='quantity' />

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
